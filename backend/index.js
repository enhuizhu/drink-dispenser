const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('koa-router')();
const app = new Koa();

app.use(bodyParser());
app.use(cors());

router
  .get('/', (ctx) => {
    ctx.body = 'test';
  })
  .post('/api/temperatures', (ctx) => {
    ctx.body = { 
      success : 'submitted successfully',
    } 
  })
  .get('/api/temperature', (ctx) => {
    const baseTimestamp = +(new Date());
    const response = {
      'temps':[   
      ]
    };

    for(let i = 0; i < 30; i++) {
      response.temps.push({'timestamp': (baseTimestamp - 1000 * 60 * i).toString(), 'temp': 90 + (Math.round(Math.random() * 10))});
    }

    ctx.body = response;
  })
  .post('/api/lowstockalert', (ctx) => {
    ctx.body = {
      success : 'submitted successfully',
    }
  });

app.use(router.routes());
app.listen(4000, () => {
  console.log('app run on port 4000');
});
