using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FlightDash
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            splitContainer1.SplitterDistance = splitContainer1.Width * 4/5;
            splitContainer2.SplitterDistance = splitContainer2.Height * 7/10;
            
        }
    }
}
