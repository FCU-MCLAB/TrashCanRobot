using IPS.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace IPS.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IHttpActionResult Get()
        {
            //創建一個HttpClient
            HttpClient client = new HttpClient();

            //DefaultRequestHeader to Json
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //創建HttpResponse的實例並異步調用該服務
            HttpResponseMessage response = client.GetAsync("http://140.134.25.59/cgi-bin/vilscgi?action=vilsnodes").Result;

            PositionViewModel positionlist = null;
            String[] tag = null;
            var position = new Position();
            //Http狀態碼200
            try
            {
                if (response.IsSuccessStatusCode)
                {
                    //將響應內容結果轉換成字串
                    var JSON = response.Content.ReadAsStringAsync().Result;


                    //var position = new Position();
                    //將字符串（JSON）反序列化
                    positionlist = JsonConvert.DeserializeObject<PositionViewModel>(JSON);
                    tag = positionlist.LOC_TAG_INDEX_0.Split(',');


                    //position.X = Convert.ToInt32(tag[6]);
                    //position.Y = 800 - Convert.ToInt32(tag[7]);

                    position = getRealPosition(Convert.ToInt32(tag[6]), 800 - Convert.ToInt32(tag[7]));
                    //釋放HttpResponse
                    response.Dispose();

                    //釋放HttpClient
                    client.Dispose();

                    return Ok(new { Status = 1, Position = position });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Status = 0, Position = position });
            }

            //釋放HttpResponse
            response.Dispose();

            //釋放HttpClient
            client.Dispose();

            //回傳
            //List<Stopinfo> allbuslist = busarray.ToList();


            return Ok("123");
        }

        // 定義直線
        public struct L
        {
            public int a { get; set; }
            public int b { get; set; }
            public int c { get; set; }
        }

        // 定義三條直線
        L l1 = new L { a = 1, b = 0, c = -187 };
        L l2 = new L { a = 0, b = 1, c = -700 };
        L l3 = new L { a = 1, b = 0, c = -550 };
        //        L1 = : a=1,b=0,c=-187
        //L2 : a=0,b=1,c=-700
        //L3 : a=1,b=0,c=-550

        // 求點到直線距離
        // x, y 為目前室內定位座標的點

        double distance(int x, int y, L l)
        {
            double d;
            d = Math.Abs(l.a * x + l.b * y + l.c) / Math.Sqrt((l.a) ^ 2 + (l.b) ^ 2);
            return d;
        }

        // 求點投影到直線上的點

        Position getRealPosition(int x, int y)
        {

            L l = new L();
            l = distance(x, y, l1) > distance(x, y, l2) ? l2 : l1;
            l = distance(x, y, l) > distance(x, y, l3) ? l3 : l;

            int position_x, position_y;
            position_x = (((l.b) * (l.b) * x )- ((l.a) * (l.b) * y) - ((l.a) * (l.c))) / ((l.a) * (l.a) + (l.b) * (l.b));
            position_y = (-(l.a) * (l.b) * x + (l.a) * (l.a) * y - (l.b) * (l.c)) / ((l.a) * (l.a) + (l.b) * (l.b));
            var position = new Position();
            position.X = position_x;
            position.Y = position_y;
            return (position);

        }
    }
}
