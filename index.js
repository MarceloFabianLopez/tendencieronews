const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
//import MiComponent from './src/componennts/MiComponente';
var cors = require("cors");
const googleTrends = require('google-trends-api');

function diaria(){
    let currentComponent = this;
    var salida = [];
    var fecha =Date();
    googleTrends.dailyTrends({
            trendDate: fecha,
            hl :'es',
            geo: 'AR'}).then(function(results)
                            {  JSON.parse(results).default.trendingSearchesDays.forEach(s => {
                                        salida.push(s);
                                        console.log('salida dentro de daily',s['formattedDate']);}
                              )
                              //currentComponent.cambiarEstado(salida);
                              console.log('salida=',salida);
                              return (salida);
                             } 
                             ).catch(function(err)
                                                  { console.error('Oh no there was an error', err);
                                                  }
                                    )
    }

function miapi(){
  return ('resultado mi api');
}
express()
   .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/daily',(req,res) => {
     // res.send('daily.....................'+miapi()+diaria());
      console.log('dentro de get daily :');
     
      var salida = [];
      var fecha =Date();
      googleTrends.dailyTrends({
              trendDate: fecha,
              hl :'es',
              geo: 'AR'}).then(function(results)
                              {  JSON.parse(results).default.trendingSearchesDays.forEach(s => {
                                          salida.push(s);
                                          console.log('salida dentro de daily',s['formattedDate']);}
                                )
                                //currentComponent.cambiarEstado(salida);
                                console.log('salida=',salida);
                                //return (salida);
                                res.send(salida);
                               } 
                               ).catch(function(err)
                                                    { console.error('Oh no there was an error', err);
                                                    res.send('error api');
                                                    }
                                      )
   
   
   
    })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
