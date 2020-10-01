const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000
var cors = require("cors");
const googleTrends = require('google-trends-api');




express()
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/daily', (req, res) => {
    var salida = [];
    var fecha = Date();

    googleTrends.dailyTrends({
      hl: 'es',
      timezone: 180,
      geo: 'AR'
    }).then(function (results) {
      JSON.parse(results).default.trendingSearchesDays.forEach(s => {
        salida.push(s);
      })
      res.send(salida);
    }).catch(function (err) {
      console.error('Oh no there was an error', err);
      res.send('error api');
    })

  })

  
    .get('/realtime', (req, res) => {
      let salida=[];
      console.log("realtime");
      //res.send('realtime api');
      googleTrends.realTimeTrends({
        geo: 'AR',
        category: 'all',
      }).then ( function (results){
            //console.log(results);
            JSON.parse(results).storySummaries.trendingStories.forEach(s => {
            salida.push(s);
            //console.log('s',s);
          })
          //salida.map((una,i)  => {
          //  console.log(una.title);
           // res.send(una);
          //})
        //console.log(salida);
        res.send(salida);
        }).catch( function(error) {
        console.log('error',error);
        res.send('error api');
      }

      )
     }
     )
   
  
  

.listen(PORT, () => console.log(`Listening on ${ PORT }`))

