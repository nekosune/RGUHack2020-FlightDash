using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    public class RtfBuilder
    {
        private StringBuilder rtFBuilder;
        public RtfBuilder()
        {
            rtFBuilder=new StringBuilder();
            rtFBuilder.Append(@"{\rtf1\ansi ");

        }

        public void AppendText(string text)
        {
            rtFBuilder.Append(text);
        }

        public void AppendLine(string line)
        {
            AppendText(line);
            AppendText(@"\line");

        }

        public void AppendBold(string bold)
        {
            AppendText(@"\b ");
            AppendText(bold);
            AppendText(@"\b0 ");
        }

        public string ToRtf()
        {
            return rtFBuilder.ToString() + @" }";
        }

    }
}
