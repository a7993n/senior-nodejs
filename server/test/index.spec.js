const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const Pollution = require('../models/Pollution');

chai.use(chaiHttp);

const setup = (...Pollution) => {
    return BlueBird.mapSeries(Pollution, user => {
        return chai.request(server)
            .post('/Pollution')
            .send(user)
            .then(response => {
                return response.body;
            })
    })
}

describe('Pollution_api', () => {
    
    const pollutin_1 = {
        ts: '2020-01-01 00:00:00',
        aqius: 1,
        mainus: 'test',
        aqicn: 1,
        maincn: 'test'

    }


beforeEach(async () => {
    await Pollution.sync();
})

afterEach(async () => {
     await Pollution.drop();
})

    //GET /pollution - GET all pollution data
    describe('GET /pollution', () => {
        it('should get pollution data and save it to DB', async () => {
            const pollution = await setup(pollutin_1);
            const response = await chai.request(server).get('/pollution');
            response.should.have.status(200);            
        })
    })


    //Execute the cronjob function
    describe('GET /pollution/cronjob', () => {
        it('should get pollution data and save it to DB', async () => {
            const response = await chai.request(server).get('/pollution/cronjob');
            response.should.have.status(200);
        })
    })


    //GET /pollution/all - get pollution data from database
    describe('GET /pollution/all', () => {
        it('should get all pollution', async () => {
            await setup(pollutin_1);
            const response = await chai.request(server)
                .get('/pollution/all');
            response.should.have.status(200);
            response.body.should.be.a('array');
                
        })
    }
    )

    //GET /pollution/ - get pollution data by longitude and latitude
    describe('GET /pollution/', () => {
        it('should get pollution by longitude and latitude', async () => {
            await setup(pollutin_1);
            const response = await chai.request(server)
                .get('/pollution/?longitude=20&latitude=39');
            response.should.have.status(200);
        })
    }
    )

});