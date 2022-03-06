const { test } = require("media-typer");
const request = require("supertest")
const app = require("../server")

// This passes because 1 === 1
it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})

describe('End Point Test', () => {
    it('POST /new-player', (done) => {
        request(app)
        .post("/new-player")
        .expect("Content-Type", /json/)
        .send({
            name: "Braden",
        })
        .expect(200)
        .expect((res) => {
            res.body.status = "success"
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

   it("POST /remove-player", (done) => {
        request(app)
        .post("/remove-player")
        .expect("Content-Type", /json/)
        .send({
            name: "Braden"
        })
        .expect(200)
        .expect((res) => {
            res.body.status = "success"
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
    });

    // Insert other tests below this line

    // Insert other tests above this line
});