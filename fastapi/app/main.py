from app.core.config import settings
from app.routers import items
from fastapi import FastAPI

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

app.include_router(items.router, prefix=f"{settings.API_V1_STR}/items", tags=["items"])


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Boilerplate"}
