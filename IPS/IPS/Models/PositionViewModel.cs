using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IPS.Models
{
    public class PositionViewModel
    {


        public string LOC_COORD_NUM { get; set; }
        public string LOC_ANCHOR_NUM { get; set; }
        public string LOC_TAG_NUM { get; set; }
        public string LOC_COORD_INDEX_0 { get; set; }
        public string LOC_ANCHOR_INDEX_0 { get; set; }
        public string LOC_ANCHOR_INDEX_1 { get; set; }
        public string LOC_ANCHOR_INDEX_2 { get; set; }
        public string LOC_ANCHOR_INDEX_3 { get; set; }
        public string LOC_TAG_INDEX_0 { get; set; }


    }
    public partial class Position
    {

        public int X { get; set; }
        public int Y { get; set; }
    }
}