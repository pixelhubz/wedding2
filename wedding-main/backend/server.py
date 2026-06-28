from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Wedding Config Models ============
class Couple(BaseModel):
    bride: str
    groom: str
    brideShort: str
    groomShort: str


class Parents(BaseModel):
    father: str
    mother: str


class FamilyDetails(BaseModel):
    brideParents: Parents
    groomParents: Parents


class Ceremony(BaseModel):
    isoDateTime: str
    dateDisplay: str
    dayDisplay: str
    timeDisplay: str
    monthShort: str
    day: str
    year: str


class Venue(BaseModel):
    name: str
    area: str
    fullAddress: str
    mapsUrl: str


class Music(BaseModel):
    url: str
    title: str


class Messages(BaseModel):
    mantraScript: str
    mantraMalayalam: str
    invitationOpener: str
    invitationBody: str
    invitationCloser: str
    coverHint: str
    scratchHint: str
    closingNote: str


class WeddingConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")
    couple: Couple
    family: FamilyDetails
    ceremony: Ceremony
    venue: Venue
    music: Music
    messages: Messages
    shareText: str


DEFAULT_WEDDING_CONFIG = {
    "couple": {
        "bride": "Aswathy Sreekumar",
        "groom": "Sanjay Suresh",
        "brideShort": "Aswathy",
        "groomShort": "Sanjay",
    },
    "family": {
        "brideParents": {
            "father": "Sreekumar P",
            "mother": "Usha Sreekumar",
        },
        "groomParents": {
            "father": "Suresh A R",
            "mother": "Renjini Suresh",
        },
    },
    "ceremony": {
        "isoDateTime": "2026-08-21T10:00:00+05:30",
        "dateDisplay": "21 August 2026",
        "dayDisplay": "Friday",
        "timeDisplay": "10:00 AM – 10:15 AM",
        "monthShort": "Aug",
        "day": "21",
        "year": "2026",
    },
    "venue": {
        "name": "Kunnathoor Devi Temple",
        "area": "Kuttamperoor",
        "fullAddress": "Kunnathoor Devi Temple, Kuttamperoor, Kerala",
        "mapsUrl": "https://maps.app.goo.gl/oacr9vV8mYDg7scZ6?g_st=aw",
    },
    "music": {
        "url": "https://customer-assets.emergentagent.com/job_200cfdde-0318-4528-9004-cf2c6cf56e67/artifacts/irjyt1ye__Sreeragamo_Bgm_Violin_Cover_Malayalam_Ringtone_%28by%20Fringster.com%29.mp3",
        "title": "Sreeragamo · Violin Cover",
    },
    "messages": {
        "mantraScript": "Mangalyam",
        "mantraMalayalam": "മംഗല്യം",
        "invitationOpener": "With the blessings of our families",
        "invitationBody": (
            "we joyfully invite you to share in the sacred moment as two souls become one, "
            "woven together in love, prayer, and a thousand quiet promises."
        ),
        "invitationCloser": "Your presence is our greatest blessing.",
        "coverHint": "Pull the flap to open",
        "scratchHint": "Scratch to reveal the date",
        "closingNote": "With love & gratitude, Aswathy's Family & Sanjay's Family",
    },
    "shareText": (
        "We're getting married! 💍\n\nAswathy & Sanjay\n21 August 2026\n"
        "Kunnathoor Devi Temple, Kuttamperoor\n\nView our invitation:"
    ),
}

WEDDING_DOC_KEY = "primary"


async def ensure_wedding_seed():
    """Ensure a single wedding-config doc exists; insert defaults if missing."""
    existing = await db.wedding_config.find_one({"_key": WEDDING_DOC_KEY})
    if not existing:
        doc = {**DEFAULT_WEDDING_CONFIG, "_key": WEDDING_DOC_KEY}
        await db.wedding_config.insert_one(doc)


# ============ Existing Status models ============
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/wedding", response_model=WeddingConfig)
async def get_wedding_config():
    doc = await db.wedding_config.find_one({"_key": WEDDING_DOC_KEY}, {"_id": 0, "_key": 0})
    if not doc:
        # Lazy seed in case startup hook didn't run yet
        await ensure_wedding_seed()
        doc = await db.wedding_config.find_one({"_key": WEDDING_DOC_KEY}, {"_id": 0, "_key": 0})
    if not doc:
        raise HTTPException(status_code=500, detail="Wedding config unavailable")
    return doc


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    try:
        await ensure_wedding_seed()
        logger.info("Wedding config seed ensured")
    except Exception as e:
        logger.exception("Failed to seed wedding config: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
