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
        public Game Game { get; set; }=new Game();
        public Form1()
        {
            InitializeComponent();
            Game.InititalizeGame();
            this.AcceptButton = actionButton;
            StatusBar();

            richTextBox1.Text+= Game.GetRoomHeader();
        }

        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            splitContainer1.SplitterDistance = splitContainer1.Width * 4/5;
            splitContainer2.SplitterDistance = splitContainer2.Height * 7/10;
            
        }

        public void StatusBar()
        {
            toolStripStatusLabel1.Text = Game.RoomTitle();
            toolStripStatusLabel2.Text = $"Time to Flight: {Game.TimeToFlight / 60:D2}:{Game.TimeToFlight % 60:D2}";
            toolStripStatusLabel3.Text = $"Money: {Game.Player?.Money ?? 0:C}";

        }
        private void actionButton_Click(object sender, EventArgs e)
        {
            listBox1.Items.Add(inputBox.Text);
            listBox1.SelectedIndex = listBox1.Items.Count-1;
            var parsed = Game.TryParseInput(inputBox.Text, out var output);
            if (parsed)
            {
                richTextBox1.Text += "> " + inputBox.Text+Environment.NewLine;
                richTextBox1.Text += output;
                inputBox.Text = "";
                richTextBox1.SelectionStart = richTextBox1.Text.Length;
                richTextBox1.ScrollToCaret();
            }
            else
            {
                richTextBox1.Text += "> " + inputBox.Text + Environment.NewLine;
                richTextBox1.Text += output;
                richTextBox1.SelectionStart = richTextBox1.Text.Length;
                richTextBox1.ScrollToCaret();
            }
            StatusBar();
        }
    }
}
