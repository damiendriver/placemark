import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlacemarks, testPlaces, soccer, gaa, testplace } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Place Model tests", () => {

  let soccerList = null;

  setup(async () => {
    db.init();
    await db.placemarkStore.deleteAllPlacemarks();
    await db.placeStore.deleteAllPlaces();
    soccerList = await db.placemarkStore.addPlacemark(soccer);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(soccerList._id, testPlaces[i]);
    }
  });

  test("create single Place", async () => {
    const gaaList = await db.placemarkStore.addPlacemark(gaa);
    const place = await db.placeStore.addPlace(gaaList._id, testplace)
    assert.isNotNull(place._id);
    assertSubset (testplace, place);
  });

  test("get multiple places", async () => {
    const places = await db.placeStore.getPlacesByPlacemarkId(soccerList._id);
    assert.equal(places.length, testPlaces.length)
  });

  test("delete all places", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const gaaList = await db.placemarkStore.addPlacemark(gaa);
    const place = await db.placeStore.addPlace(gaaList._id, testplace)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (testplace, newPlace);
  });

  test("delete One Place - success", async () => {
    await db.placeStore.deletePlace(testPlaces[0]._id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacemarks.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(testPlaces[0]._id);
    assert.isNull(deletedPlace);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete one place - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacemarks.length);
  });
});