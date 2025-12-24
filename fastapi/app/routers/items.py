from fastapi import APIRouter

from app.models.item import ItemCreate

router = APIRouter()


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@router.get("/", response_model=list[dict])
async def read_items(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]


@router.post("/", response_model=dict)
async def create_item(item: ItemCreate):
    return item.model_dump()


@router.get("/{item_id}", response_model=dict)
async def read_item(item_id: str):
    return {"item_id": item_id}
