import { Injectable } from "@angular/core";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PdfServiceService {
  constructor() {}

  mainLogo =
    "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBURERIVFRUWFRgaGRcXGBgYGhsaFhcXGBcWFhgYHSggGBolHRkVIjEhKCkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGzImICYvNS0tLTAtLS0vLS8tLS0tLS4vLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOAA4QMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFBgIBB//EAEYQAAEDAgQCBgYIBAUCBwEAAAEAAgMEEQUSITFBUQYTYXGBkRQiMlKh0RUzQmJykrHBI9Lh8FNUgsLxo7IkNENzg5PDFv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAA3EQACAgECAwQIBgIDAAMAAAAAAQIDEQQhEhMxBUFRYRQiMlKRobHwFUJTcYHhI9EzYsGS4vH/2gAMAwEAAhEDEQA/AP3FAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEBHUQNe3K8Ag8CgMo9G4b3u8dlx8roDSpKNkQysbbnzPeeKAnQGXVYFC85rFpO+U2+BFkB7osGijOYAuI2Ltbdw2QGigKtbQRyiz23tsRoR4oCh//ADUPvP8AMfyoDZQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEBXqKxjPacL8tz5LPbqqqvaZZCqc+iM6bG/cb4n5BebZ2svyR+Jqjo/eZTmxeTcuDR4D9Vjl2hqJ9H8EXLTVrqUX44ONQ384+ahztU+9neCleB5GON/wAyP/sHzXOZqV3scNPkW4MYefZlDvEOU1rNTDvf8nOTVLuLsWNPHtNB7tFor7WsXtrJXLRx7mX6fFI3aXynt+a9GrtGmzvw/MzT004+ZdBW5PJQfUAQBAEAQBAEAQBAEAQBAEAQBAEAQBARTztYLuNh/eyqtuhVHikyUIOTwjCxDGTYkEMaNyTbzPBeHf2jZa+GvZfM316aMN5mL6W9/wBWwke++7W+A9p3lbtWFwS3m/8A1l/E37KHorne3K49jPUHwu74rnMivZXx3O8LfVnpmHxDXq2k83DMfN1yuO2b7xy4+BPZrRwAHcFHibOvCWWRwVDH3yOa629keUQrurs9h5PklHG72o2HvaF1WTXRk3CL7iP0ED2HvZ3OuPyuuFLmt+0kznBjoC6Zm4bIObfVd+Umx8x3LuK5eQzJeZdw3F7GzHbbsdcEd7TqFfVqLtP06fIrlXXb+50dFiDZNNncj+3Ne3ptbXdt0fgYLaJV/sXFtKQgCAIAgCAIAgCAIAgKkmIxtJBdqOwrJPXUwk4ye5bGibWUj59KRe98D8lH8Q0/vEvRrPAfSkXvfA/JPxDT+8PRrPAfSkXvfA/JPxDT+8PRrPAfSkXvfA/JPxDT+8PRrPA8TYtGAS03PAWKhZ2lTGLcXlnY6abe5zOIYk5z8oGeS3s7Bo5uP2R8SvEsnO58dj2++huiowXDFbkMVHqHyHO7hf2W/hbw7zc9qqdu2I7Imod8i0qiYQBAYPSSoDv4BzWtmcWOykW1HhxWijMXxHn6jtHkWcKipbb53MbD8sLxI3rXEe87Sx5ho18VfZY5rhwkZ32wksV1JLvwjtY3hwDhsRceKw4wetCSlFSXeelwkEBDUUzX2zDUbOGjh3EahThNx6EZRTIBUPi+sN2cJBpb/wBwDb8Q052ViSlvDZ+H+iOXHaXQ6bD8WFrSHudz77L1dL2kscNvXxMlulecwLn0pF73wPyWz8Q0/vFPo1ngPpSL3vgfkn4hp/eHo1ngPpSL3vgfkn4hp/eHo1ngPpSL3vgfkn4hp/eHo1ngPpSL3vgU/ENP7w9Gs8C211xccVsTTWUUNYPq6AgCAiqagMaXH/nsVN90aoOUicIObwjjMTncbWdZ0jwLixIF8ziLi3sgr5dPjnKcv3PVfqxUURGB18vpD7kE2tFewtc2ydo81zjWM8P1JcuWM5ZX65n+bP8A0v5F3i/6fUzekVfqfQnERNrVD9RcfVagbkep2jzXOJdeH6miMXKPEnsQdaz/ADZ/6X8i7n/p9TP6RV+p9CYRk2tUv9b2fqtdL6epqucS936l8YuUeKL2LNPA1gs3vJOpJ4lx4lQnNyeWSjFLoSqBIIAgCHGYMtdCw9c0ZnSaEHgBo7zVyjJ7Hiz1NEHzo7uXyXeeeugj/hN9ZkmrncgfZHgu4k9znM01b5S3Uur8M9PgauGvZlyMNxGct+el7quaecs9LSSr4eCD2jsW1A1BAEAQFI0gZo2V0bSbBoyWBPBuZpI7vJX8zi6xyyCrf5WRSODSQ6qcCOB6r+ROJe59SiV1cXiU9/4PTBcZhUutcC/8K1zsPY3Ti/6/Utr/AMizCWTzI4NNnVTgRwPVfyJxL3PqVyurg8Snh/wemC7cwqXEA2v/AArX5XydoTiWccP1LK8WexLJJAXNlyOeXBzLtzBo1abOHqgcC1cliUOJLB1ZUsNnXYRVhzA2/rNFvDgV7/Z+pVlai+qPP1FbjLPcy+vQM4QFLFqhzGAtNje3wKw6++dNfFDrkv09cZywzlarEXveWhj5HNtc3aGi4vuTflsCvBnKVuJWSN8Uo7QRHBA7N1khBfawA9lo4hvEk2FzxsNlXKaxwx6E4xecvqcZWOrnVnpLYJLNNmt4ZOLTrx1v39i9SHo6p5bkvP8Ac+hrWlWn5Tkt+v7m/JhGeZr8paxwzOadCDxbbt+a83jwsHxd3ZmdTlez3/fmYOI+nOqxUMgkAYbMbbTKNwdftfLkvSr9HVXA5LfqfZ0rSx0/Kclv1+/I3pcJ6yVsmUta8ZntOhB4jx+a81z4co+N1PZilqcr2e/78zDx5tbJUtkihkDYjaPTTTdxF+O3cvR0/IjVwyksvqfY6NaWujglJb9fvyO0o5i+NrnNLHEatO4PELyrIqMmk8njWRUZNJ5JXGwvyUVuQOUqunMQJEcT39ps0fufgvRh2bNrMmerX2VOSy5L6mfJ07l+zCwd7nH5K9dmw75M0rsiHfJkcfS6qlcI2tju7Swa6/bY5uV0loKYRcm2V6rs6iuiUpN7I+vpZ26gNeb2LGbsJ9m5Nr9qoTqe3Tz8T470TQ2LgjLhax627z47d3l8waSe4bZpv/6jfZbb2s2u4+KZp6/LxO+iaFvmJvCz6rec46bpbefyEmI1NI3M3q3McQM9iQ7QkaaZTvdTqppueNz2OxtJpLZy4G91nHcv57/gGdOZxvHEfzD9yrX2bX3NnvPsmrubLcHTz/Eg/K+/wIH6quXZnuyKZdke7L5HSYNjEdSwujzCxsQ4Wse/Y+CwX0SpeJHmajTyplwyNBUFBxnTBlVNK1kUUnVxkEOHF/vDu2HivV0Tprg3JrLPZ7PdFcHKcll/Q0H0ctRFHI+Mxy6NeDpf747Fknwwm1F5XcfMdr9nRnbml5/1/Rm9KaWocWQQQydVHY5h9p/vb8P1JWvRyqinKbWX9D6LsmvT6ar1ms9P4/s0TSS1ELHvYWTCzXg6X+/+/mstnBCbUXlHz/bHZ8bLOKl5/wBf0UuldLOWMpoInujaLucB7TuA8N++3JaNFKuOZze57vY9Wn00Myks9F/6zXwYSy07RO18csZ0cRqbDR453GhHHVUXOELG4PKZm1tdfMzW9uq8i96bJEMz2HT7cZFu+xIcO7XvKrhFcWa5YZik3j1kdPhFY97i1xuA3kOYXq9naq22bjN5wjJqaYwScTWXsGIzce+rH4h+hXmdq/8ACv3Nek9v+DlqX6yb8Tf+xq8Kfsx++83x6stKomEAQBAEAQBAEBztfhMOZ0Zju6QFzXECwI1DG/FaYXWJZTPP5lmnk66pSTlunnZeRk0WAwOGaUZQ45WWJF3c9OAWh6u1dGS0na+tSzbZ12WUuv8Aoiw/AmCUl12iO+c3OnC3eV2zVzlHHiQl2trNTGdF7XD+Z4wXHUj2zdWwnXYg2u06304WWfiWMnivTzjdy4vr9D7XU3V26txcx2xHEjQgjvSLz1Gop5TXA8xf1PGKYM0xC5uW26wD7JO3hwU6b5QllHoaey3s/wDy0P1ksSXhkip+jkJjF79a+7mAk2IHA9p1t3K1623Pkemu2tbOtJzSm91sun9kuH4bAxhdJCDmdkaLesLe0RfiFXPUWy/MY4dp6uUG75yeXhJbfv0Opw6jEUYY3mTe1t/7Cxzk5PLNunq5cMZz5stKJeEAQBAEAQBAVcU+pk/CVbT7aIWeyzdwE/xD+H9wvQ7Kf+V/sZ9X7CN1fQHmnHYpij3ODfacfZZewA95x4Dt8l8tbdPUPim8I9aMI17R6kNLAW5i52ZzjckCw0AAAHKwWec1LCS2RbGLXU5rGqpzpnDMQGmwAPLirYJYPmtfqJyuazsjX6PVRfGQ43LTa55Hb91VZHDPV7MvlZW1LuNVVnpBAEAQBAEB8IQ40n1KdZhcchBdcECwsbW8NlOM2jLfoq7nmR5rsN6xuXPl1BcbD1iAAC5IzwRv0XNjwp48fM8tw1wjyB4zWLQ+2oadxuu8e+SC0clVwcW/TPkeKDCjGCC4OF8wBGzhsd0lPJzT6F1LDeV1XkzzS4OWvLzJmvfMMujgdwdV1zysEaez3Cbm5Zz126k0uEMc/O4uvpYA2AA2AXONpYLZ6CudnG2/LyL3Vi97C449+6hk2cEeuD0uEggCAIAgCA8NmaXFocCRuL6jwXcEFZFy4U9zmukNQ4zZbkBoHmdbq+tLB8/2ndJ3cKeyNqgPW07c+uZtj2203VbfDLKPZ0k+bRFyPvXPhN3uLo/f+0z8dt2/e4ceasWJ7x2l99C15j13Rq+nyf4h81P0rUe8znKq8DOoIiAXu9t+ruzkwdjRp5niqbJZeF0ROC2y+pDU4tGyQRm99LngL7XUVBtZMtuurrt5bOdxllp399/MAq+Hso8HXRxqJFzA6kRRyPdci7RYc9VCyPE0jX2fdGiudkvI6ClnEjGvGxHFUtYeD3KbVbBTXeSrhYEAQHP03Shj6v0fJpmc0PvoXNG1rc9PJbZaKUauZnzwehPQSjTzc+eDoFiPPCA8TShjS9xs1oJJ5AakrsYuTwiUYuTSRHQ1bJoxJGbtdextbYkbHuUrK3CXDLqdsrlXLhl1J1AgeZSQ0loubGw2ubaBdWM7nY4zuZdNWVJpXSPgAmF8sd97bce/jwWiVdStUVL1fE1TrpVyiper4liCuLacTVIEZDbvG9tbcPDzUJVp2cFe/gVyqUreCrfwLNLUNkY2RmrXAEcNDtoq5xcZOLKpwcJOL6olUSIQBAEAQBDj6HK4CT6QL72dfyWmfsnzfZzfpW/mR48P/EO8P+0JX7JDtJY1EixUyObSRAEi7jtpxJXFvNl9s5Q0cFF4yzVwOqMsXrakHKb8RbS6rmuF7Hpdn3u6r1uq2H0HT+58XfNWek2GrkwPWMySNjDor3Dhewvpr/RVQSb3M+unbCtSr8d/2MGpIfVAjUOc342Vy2ieJa1Zq0/Fol6SstNfm0fC4XKnsWdqxxdnxRHSxl8HVMBLnSX2NgANydl1vDyyFMHZRy4Lds6elhDGNYPsgD+qzt5eT6OmtVwUF3Eq4WFHGsSFNCZXNLgCBYdptqeAV1FPNnwpl+nod1ignggxHFgyiNSAReMFoO+Z49UHxKnVRm7l+ZOnTuWoVXnv/Byc9E2PDoZWub1zHiU6jN65Gh46DJ5FelGxy1Eoteq1g9aNrnqpQa9VrHwOrxGvLqF88ZsTFmBHA2/ZedXVi9Ql4nlVUpalVyXfgxaalqp6QTmqe1wYS1rdAct9Xnck28NFqlOmu7g4O82Tsoqvdagms7/0ehPLVYZ1hkLXNbJnsB64aCLO5XFlzhhTqeHGc9PI44Qo1fCo5TxjyPXRZjoqX0l0zjGI3nqraCzjqDz0Pmmranby1HfPUa1xsv5SjvlbnzC6WprI/SH1T4g4nIyPQAA215pbOqiXAoZ8ci6ynTS5cYJ46tljAMTlcKiCZ2aSEH1+YsbE9unxUNRTBOE4dGV6qitOFkFtLuK+GYjK7CpJnSOMgD7O4ixFlO2qC1SgltsWXUVrWRglttsR4mJJcLZKZXaR3ePfu4WzHsUquGGqcEu/byJU8FescFHv28izhLn01F6Q6V0jepaWxnQNPAA+ICru4bruWljfqV3qN+o5Sjjfd+J4oMNqqiITvq5GPeMzWt0aAdrhdsupqnwKCaR22+imfLVaaXV958oMdnNHOSM00Byk231tmIG9vW8ks01auj7shbpKlfBL2Zbnzo40zBkorpHSaOfGSLdrcvLt2XdT/jzHlrHczurfKzDlJLuZssxppqzSZHZg3Nm4bA7ctd1kenap5uTG9M1Rzs/waizmUIDm62F1PP1wF2Ek+e4PLir4tSjg+f1FctLqObFZX3kz8Rq+tkLwLaAW32U4x4Vgxaq/n2ceMF/FW2poP73F1GHtM26xY0tSLvRllonHm79AAoW9TX2TFqpvxZsKo9U8xSBzQ4G4IBB7DqF1rDwzieUYuOw5ZI5uAIDvA6FWwezR4/aFXBbC5dO8qdJXAytsb+oP1KlUtjL2rJO1NeBsYEy1OztufMlVWP1j1ezo8OniX1A3BAfCL6FdTwDm+llLLPJBAxjjHnDpHAaAXta/dm+C3aScK4ym3v3HpaGyFUZ2Se+NkWX9EqOxtFY88ztO3dVrXXZ3ZWu0dRn2jLw2lnFBUUz435mhwZp7Qd7vPW/mtNs63fCxP9zTdZU9TC1PbbPkbOD0720DY3NIcIiMp3vY6WWW6cXe5J7ZMeonGWpck9slDo/h8ow18Lmlr3CUAO09oGyu1NsHqVNPbY0aq6D1amnlbEXR3O+ndRSwSR2Y8F5Fm+sTYDt9b4KWp4Y2K6Mk9+hLV8MbVfCSe62PGFV1RSR+jyUskmUnI6MXaQTfU8F22qu+XMjNLxySvqq1EubGaWeqZZwLDpGtqKicZXzAnL7oAJ17fkoX2xk4Vw6Ir1N0JOFVe6j3+JRwGFz8IkawEuPWAAbk3Gyt1ElHVpvyLtTJR10W+mxoigkdhfU5SJOqtlOhuDe3eqObFarjztkz86C1vMztnqQYa19RRupHwyRFsYbmeLAkbW8hdTtcarlamnlk7nGnUK6Mk03nY8Ydi1TTxCB9JK97BlaWi7SBtcqVlFVk+NTWGSt09Ns+ZGxJPrnqT4JRy0tPJM6MvlkfndG062J2Hbq4qu+yF1kYJ4S2yV6m2F9sYReIpYyZk9MaioifT0kkDmvBfI5uQWuL6Dc7991ojNVVyVk1LwXU0xsVNUo22KSa2XU7i2t15OTxMhcAQBAc30njs9hA3afgf6q+p7Hz/a0Epxa8CCtqOtbDEzUhoH+ogC3gpRWMtlN93PjXVDuXzOlpIBGxrBwHx4nzWdvLyfQ0VKqtQXcTLmC0osd1Lsrvq3H1XcGknVjuQvse23K97XMWV17/ADK16jw+hdc0EWIuDwKpJtKSwzmukFGGvZkbYEWsBxv/AFV9csrc+f7S06hOPAuv1OhpYskbW8mgeQVDeWe5TDgrjHwRKuFoQBAeJJWtF3EAEgam2p2GvFdUW+hxtLqRxVsTnFjZGOc3docCR3hTdU0stPBxTi3hMU1bFISI5GPI3DXA277Lk6px3ksCM4y6MVVbFHbrJGMvtmcBfuuuwqnP2VkSnGPVnt1QwZbvaM2jdRqTsG81xQk87dDvEj6+ZoIaXAF2wJAJtvYcVxRbWUg2k8Mq4XLI7rOsdG60jg3qzezRsH/e5q26MFjhT6d5Ctyec4MzG53yu6inqYG5mlrmlwL7nfKB2K+iCguOcHt8DZpdRpoP192um5bw009LGym65gcOBc0Ekm5Nr81XarbpOzheCrUapW2uUnuzSfK1tszgLmwubXPIcys6i30RW2kRQV0T3FrJGOcNw1wJHeApSqnFZkmkRU4yeEz1U1ccYvI9rBzcQP1XIVyn7KydlKMerPcMrXtDmODgdiCCPMLkouLw0dTTWURRV8TnljZWOcN2hwJ07LqTqnFcTTwRVkW8JlhVkwgCAIDE6URXYx3Ikef/AAranueR2vW3CMvAu4VQsYxrsoDy0XPHX9FGcm2atHpoVwUsb43JaqpynIwZpDs3l953Jo+OwXYQzu+hqlLGy6lb0Gf/ADTvyNVnNr9wjy5e8dLjWHsaMwGjjYtOo1/vZb+0NJGpcyG25RprnP1ZGBQNyukYL5WuGUE3sC0GwvwvwXnWPKizRBYbRcIVJNpMIdCAIAgMDpu29Lba8sWo39sajtW/s54uz5P6GXVrNf8AKKfSbCoWOpAxgZedsZy+qSxzTmaSN72/VXaS+clZxPO2f5K9RVFOGF34LFdSsir6QxNazOJGOygAFobcAgdqrrslZp7FN5xhk5wUbocOxSw0yyTVMno0cx65zLveAWtbo1gaWmwtr23V1vBCEI8bW2dkV18UpSfDncniwrLQzR1Vo2Ne98ZDs3VD2m5T2G9lW709RGVW+dn5klVipqe3evI+dEpXTyumqPr2MY0MItlY5oOcDm87nwXdclVBQr9lvOfPw/g5pnxycp9V9/MoPqHR0VYWEtJrHtLhuGuc0OPkVfwKV9afulfE41Tx7x1lFhUEbWiOJgy2scovf3s29+1eXZfZOT4mzdCqEUsIwauT0mOcw00Jj/iB0shsXFoOZzQGk6cyRst1ceTKCnN522Rmk+ZGXDFY8WVKwmSgw/OSc0sIJvrYgt37lbX6moux3JlcvWprz4ov47RxwzUb4mNY7rwz1QBdrmm4Nt9ln01k7IWRm87ZLboKEoOKxuSYbC2auqnSgOdEWMYHC4a0tvcA8zxXLpOvT1qG2d3+52uKnbJy7uhHS0wbW1VPCcjHwBxDdmSOu24HAkG6lOeaIWz3afxRGMcWyhHo18z5gZ9GfDSz07GvsWxzMsQ8ga3NszXEc01C50ZW1yyu9eApfLahOO/c/E6heYbQgCAID4QhxpPqQYi8tieWmxDTY8u1WVJOaTIzeIsu4NhjC4tGnFx3c7hqTqStWlp9Js4ZPZFVs+VHKRu/REXI+ZXr/htHgY/SrPE8Y99WPxD9Codq/wDCv3JaT2/4ORbUsZLJnOW7m2JuAfUA9o6b9q8RwlKEeE2qSUnkvX0uqcFq3Mw9IqT/AB2eav8ARLvdZqWiv9xmhHO1wBBBzC47RpqPMKlxaeGZX6suF9TPPSGkGhnZ5q5aW5/lNS0V734WaEU7XBpa4EOF29o5hUuLTwzLL1ZcL6mLi+IUczeqlna3K8EgGxBY69jccwtdFd9b44x7vqXS7PutivVeOpfnpoqkRSBxLWSCRhbsS24F7jUalVRsnS5Rx1WGZ7qPWSls0ySqw9sksUpJzRFxbbb1hY3UIXOEJQXRnJVqUlLwKdbhMfWGVkz4HutmLHNAdbYua4EX7VdXqJ8PA48SXTJF6ZylxRyn5FarbSOjZFNVhzWvzHNKy7yDcB/Nt+CnCVyk5QhjKx06F3oNk4pYbLUbaeaoZPFKDIxpacjm+s0/ZeOICrbtrrcJLZ+Is0k4SU5Jomp8HiayWMgubK9znB2ur9wLcFGWpm5Rl0a2RSqYpNeJBQ4H1Tm5aicsadIy4FvcdLkdl1OzVcaeYrL7yMKOF7SePA8Do3GC8CSURPJLog6zCXb8LgHldS9Nls2lld/ec9Gjvu8PuJvoKPqoYrvywPa5puLksvbNpqNVX6VPjlPvl1JciPCo+BZxDDmzGMvJHVSB7bcwCNezVQqulWpJd6wTnWptZ7tyvXYM2STrmvfFJaxfGQMw4BwIIKnXqZQjwNJrwZCdKlLiTwz1R4PHGyRrXPzSXzyF38Qm1r5uFuHJcs1MpyTfRdF3HYUqKaXf3mWDSxTh09W6SSK4aJXD1CRqbBoubcStLd068Vwwn1x3l9XZ1ssTSb8Ddpq6ORudjw5pNgRtfkFhnXKDxJC2LqeJ7EFTjVPG4skmY1w3BNirIaeyazFF0NLdNcUY5RNTV8Ujc7Htc29rja/L4hVzrlB4kim2DpeLNiKrxinidkklax29joddlOGnsmsxWUW16a2xZhHKJaKvimBMTw8A2JHPko2VSr2ksELKp1vE1ggxSqZ1b4w67yLZW3cb9oG3ip01y4lLuM1klho6PAfrHfh/cLd2T/yy/Yp1nsI3V9AeaRVNO2QZXDS9+SpuohdHhn0LITcHlGPiGE5QXM1HEHf+q8bVdmutcdfTwNtWq4niRzwZ1L25dI3mxbwa47FvIHYjmR2rBnmR36o0Y4Xt0MGt6Jh9aJLDqXXe8feH2bcnHXwK1w1zjTw/m6I9mvtFx07j+ZbL9v6LNRHUmbrWxkZT6o02HDfj+6yJxxjJ8ZbHVyv5qi9un7Fau6LCWrbLbLE/1pG8Q4fZ/wBX7Hmtdet4KXHvXQ+x0/aTjpuF+13ffkWaqOodMJGxkBujRpsOG/FZE443Z8dfHVzv5qi9uhXxnox19RHKBka/60cRYbjtO3xWujW8utxfVdD7DR9ouFDjJb9335HUxsDQGtFgAAAOAGwXnNtvLPObcnlnpcOHM1zAHuJZxOpaee9/Rz+pXoVt4W/38T0a8tLf7/8AkZtTWNAIztGh06wN+Ho60Qg89Pl/ZphW21t8v/scxhdNK+RogDs4IsRpl7SeAW62cIxfH0PVvsrjB8zodwaHFLf+Ziv+EfrkXk8zSZ9lnh83Q59h/f8AJWkw7Fv8wzwcB/8AmFYrdH7v38S1X6D3H9/yVJcLxXjK490oHyVkbtH4fItjqNB7vyKUuEYlxEx/+UH/AHq6N+l7sfAvjqdF3Y+H9FSTB63jFMfEn91Yr9P4otWp0vdJHd9E4JGUjGyghwLtHbgFxt8F4+slGVrceh4WunCVzcOhsLKYzmulfRw1DmSR2D7hr/w+92lq36TVqpOMuncelodbyU4y6dV+57r6GQBkMMZEcYFttT72/wDeqo5nE3KT3Z8v2o9TqbcpPHX+Stj2AyVTI5A3LMCGvvbVvveG/mtOl1SqzF9D6HsjXzqq4bl/+/2WK7D5GsZBDGerjG+mp4k6/wB3Kzuzik5ye7PA7Wep1VuyeOv3+xDjuCyVUDHZcs7NNbes0nW5+Pgeau0upVUmn0Z7nY+tnVHFyx4/7NKkoBExlLGSBlzPcNCRfWx4Fx48AD2KuVnG3bL+PvyKdTdK+xt9/wBDoMKwvMLNAYwch+nb2qzS6SepfFJ7eJltujUsLqb1JQsjN23va1yV7lGjrpeY9TBZdKfUtLUVBACEBy2IYS55c3K7LmuCNDobgg+AXzc9JdC1uEdj01dCUFxMrfQcvOb8yj6PqP0/kOZX7w+g5ec35k9H1H6fyHHX7x8+g5ec35k9H1H6fyHMr94+/QcvOb8yej6j9P5Djr948vwaQC5M1h95RlTfFZdfyOqdbeFIqdc6LSQl0fCTi3sktw+958zTwqzeOz8P9FmXHr08S8DfZUPYsMCo6QOa9zQwEAkbm+hsrlVseJZ2rKM3FR6HwdI+cQ/N/Rd5Xgzke2Wvy/M9t6RN/wAMjuIXOU/Es/GYvrF/Ekb0ij4td8Pmucpkl2vV3pkgx+Lk/wAv6rnKZNdq0vufwK1dj+lohrxLh+gUo1eJRqO1dsVL4kdDiErwSZDoeUf+4hdlFIr0+rvsTbl9C/HVSe8D3hn7SKDijbG6zx+S/wBl+B5Lbn4f8n9VBo3Vyco5ZFUVVjkYM7+XBva88B8TwVka9uKWy++gc+5dT1T4XI/7crjxLTlHgBsFdXGdn/HDKK5cMfakTfQcvOb8ys9Hv/T+RHmV+8fPoOXnN+ZPR7/0/kOZX7x9+g5ec35k9Hv/AE/kOZX7w+g5ec35k9Hv/T+Q5lfvHuDBpGEuyyOJAF3G+guQB5lRnptRJY4Dsba0/aOpo4srGt5D48V9Fp6+XWonnWS4pNkyuIBAEAQBAEAQBAEAQGRiGE3u6Pxb8l4+r7Oz69XXwNlOpx6szmn0ToyeqOXnG72PDiw92nYvJlLfhtW/zNiXfB/6KToYMxM0fVuJ1LicpJ5PBt52PYu8Mseo8mWWk08pNzjuy43DIOEbf1VTlImtFp/dRI2hiG0bPILnEyxaWlflXwPbadg2Y3yC5lk1TWukV8D2GDkPJMkuCPgVq7D45R6w1GxGhXYzaM9+kruXrIrQYKGbSO17G/uFJ2ZM9fZ0a+kn8j1IyNhymRzne62xd+VoupRjKW+Ni7kQj1bJGRyOFtYmd95D3nZnhc9y63CPm/kXxi8Y6L5mxhWDaCwyM37T267ntK16fRWXvinsvvoVWXxrWI9To4IWsGVosF79VUa48MVsefKTk8skVhEIAgCAIAgCAIAgCAIAgCAIAgCAICvVUbJB6w8eKz36au5esiyFsodDIqsGcPZs4cjv8ivHu7LsjvW8/U2w1cX7Wxiy4W1p0Doj90lo/L7J8lik7IbTXxRdFQlvF/A8dTKPZlB/GwE+bSP0UOKt9Y/BksSXRn2844RH/U4fsU/x+Y9cB8/uRj/W4/7ExX4v4DM/IZJj9uNvc0k+Zd+yZrXcxifiPQc3tySP7L5R5MtfxXVY/wAsf/Tjh7zNKhwZ1rMYGN7rfDcrTXotRc8y2/crlfXDZG1SYUxmp9Y9u3kvW0/Z1dW73Zjs1Mp7LYvr0DOEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQHxzQdxdccU9mjqeOhWkw6I/YHhp+iyz0NEusSxX2LvITg8X3h4ql9l0efxLFq7D4MGj+95/0XPwujzHpdhIzC4h9m/eSrI9naeP5SL1Nj7yzHC1vstA7gtUKoQ9lYKpTlLqyRWEQgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAID/9k=";

  

  header = [
    {
      text: "Nombre",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    },
    {
      text: "Descripción",
      style: "tableHeader",
      alignment: "center",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    },
    {
      text: "Estatus",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    },
  ];

  generatePdf(
    reportName: string,
    header: any = this.header,
    data: any,
    alignment: string = "left",
    orientation: string = "portrait",
    mainLogo: any = this.mainLogo,
  ) {
    // data.map((el, i) => {
    //   console.log(Object.values(el));
    // });

    pdfMake.tableLayouts = {};
    let fecha = new Date();

    let options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let finalDate = fecha.toLocaleDateString("es-ES", options);
  

    var documentDefinition = {
      pageMargins: [40, 60, 40, 40],
      pageOrientation: orientation,
      header: {
        table: {
          widths: "*",
          body: [
            [
              {
                image: mainLogo,
                alignment: "right",
                fit: [100, 100],
                width: 100,
                margin: [0, 20, 20, 15],
              },
            ],
          ],
        },
        layout: "noBorders",
      },
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: "*",
            body: [
              [
                {
                  text: "Página " + currentPage.toString() + " de " + pageCount,
                  alignment: "center",
                  style: "normalText",
                  size: 10,
                },
                {
                  text: finalDate,
                  alignment: "right",
                  style: "normalText",
                  margin: [0, 0, 30, 30],
                  size: 10,
                },
              ],
            ],
          },
          layout: "noBorders",
        };
      },
      info: {
        title: reportName + ".pdf",
      },
      content: [
        {
          text: reportName,
          fontSize: 22,
          bold: true,
          margin: [0, 20, 0, 20],
        },
        {
          style: "tableExample",
          alignment: alignment,
          table: {
            headerRows: 1,
            body: [header].concat(
              data.map(
                (el, i) => Object.values(el) //TODO replace undefined
              )
            ),
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? "#CCCCCC" : null;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? "null"
                : "#2a3e52";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length ? -0.01 : -0.01;
            },
            vLineWidth: function (i) {
              return 0;
            },
          },
          //layout: "lightHorizontalLines",
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).download(reportName + ".pdf");
  }

  generatePdfExpediente(
    reportName: string,
    alumno: any = [],
    header: any = this.header,
    data: any,
    alignment: string = "left",
    orientation: string = "portrait",
    mainLogo: any = this.mainLogo
  ) {
    pdfMake.tableLayouts = {};
    let fecha = new Date();
    let options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let finalDate = fecha.toLocaleDateString("es-ES", options);

    var documentDefinition = {
      pageMargins: [40, 60, 40, 40],
      pageOrientation: orientation,
      header: {
        table: {
          widths: "*",
          body: [
            [
              {
                image: mainLogo,
                alignment: "right",
                fit: [100, 100],
                width: 100,
                margin: [0, 20, 20, 15],
              },
            ],
          ],
        },
        layout: "noBorders",
      },
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: "*",
            body: [
              [
                {
                  text: "Página " + currentPage.toString() + " de " + pageCount,
                  alignment: "center",
                  style: "normalText",
                  size: 10,
                },
                {
                  text: finalDate,
                  alignment: "right",
                  style: "normalText",
                  margin: [0, 0, 30, 30],
                  size: 10,
                },
              ],
            ],
          },
          layout: "noBorders",
        };
      },
      info: {
        title: reportName + ".pdf",
      },
      content: [
        {
          text: reportName,
          fontSize: 22,
          bold: true,
          margin: [0, 20, 0, 20],
        },
        {
          text: "Nombre del alumno: " + alumno.nombre,
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
        },
        {
          text: "Matricula: " + alumno.matricula,
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
        },
        {
          text: "Correo electrónico: " + alumno.correo,
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 20],
        },
        {
          style: "tableExample",
          alignment: alignment,
          table: {
            headerRows: 1,
            body: [header].concat(
              data.map(
                (el, i) => Object.values(el) //TODO replace undefined
              )
            ),
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? "#CCCCCC" : null;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? "null"
                : "#2a3e52";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length ? -0.01 : -0.01;
            },
            vLineWidth: function (i) {
              return 0;
            },
          },
          //layout: "lightHorizontalLines",
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).download(reportName + ".pdf");
  }
}
