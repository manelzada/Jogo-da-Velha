var mapa = '', jogada_anterior = '', onalert = '';
            var xpontos = 0, opontos = 0, vpontos = 0, total;

            var $$ = function(str){return document.querySelector(str);};
            var get = function(obj){return window.getComputedStyle(obj).getPropertyValue('display')};

            var jogo = {
              alerta: function(msg){
                $$('.msg').innerHTML = msg;
                $$('.alerta').style.display='block';
              },
              limparJogo: function (){
                mapa = {a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:''};
                total = 0;
                var path = document.querySelectorAll('path')
                for(i in path){path[i].style.display="none"}
              },

              mensagemGanhador: function (jogador){
                $$('#opontos').innerHTML = opontos;
                $$('#xpontos').innerHTML = xpontos;
                $$('#vpontos').innerHTML = vpontos;

                if (jogador == 'x' || jogador == 'o'){
                    jogo.alerta(jogador.toUpperCase() + ' ganhou essa porra');
                }else{
                  jogo.alerta('Deu Velha !!');
                }
              },

              verificar: function (j){
                     if(mapa.a == j && mapa.b == j && mapa.c == j){return true;}
                else if(mapa.d == j && mapa.e == j && mapa.f == j){return true;}
                else if(mapa.g == j && mapa.h == j && mapa.i == j){return true;}
                else if(mapa.a == j && mapa.d == j && mapa.g == j){return true;}
                else if(mapa.b == j && mapa.e == j && mapa.h == j){return true;}
                else if(mapa.c == j && mapa.f == j && mapa.i == j){return true;}
                else if(mapa.a == j && mapa.e == j && mapa.i == j){return true;}
                else if(mapa.c == j && mapa.e == j && mapa.g == j){return true;}
                else if(j == 'v' && mapa.a != '' && mapa.b != '' && mapa.c != '' && mapa.d != ''
                        && mapa.e != '' && mapa.f != '' && mapa.g != '' && mapa.h != '' && mapa.i != ''){
                  return true;
                }
                return false;
              },

              jogar: function (posicao, jogador){
                mapa[posicao.toLowerCase()] = jogador;

                if(jogo.verificar('x')){ //X ganhou
                  xpontos++;
                  jogada_anterior = 'o';
                  jogo.mensagemGanhador('x');
                }
                else if(jogo.verificar('o')){ //O ganhou
                  opontos++;
                  jogada_anterior = 'x';
                  jogo.mensagemGanhador('o');
                }
                else if(jogo.verificar('v')){ //Deu Velha
                  vpontos++;
                  jogo.mensagemGanhador('v');
                }
              },

              botaoClicado: function(posicao){
                onalert = get($$('.alerta'));
                if(onalert != 'block'){
                  x = get($$('#X'+posicao))
                  o = get($$('#O'+posicao))

                  if (jogada_anterior != 'x' && x == 'none' && o == 'none') {
                    jogada_anterior = 'x';
                    $$('#X' + posicao).style.display='block';
                    jogo.jogar(posicao, 'x');
                  }

                  else if (jogada_anterior != 'o' && x == 'none' && o == 'none'){
                    jogada_anterior = 'o';
                    $$('#O'+posicao).style.display='block';
                    jogo.jogar(posicao, 'o');
                  }

                  if(jogada_anterior == 'o'){
                    $$('#vez').innerHTML = 'Vez do X';
                  }
                  else if(jogada_anterior == 'x'){
                    $$('#vez').innerHTML = 'Vez do O';
                  }
                }
              }
            };
            window.botaoClicado = jogo.botaoClicado;