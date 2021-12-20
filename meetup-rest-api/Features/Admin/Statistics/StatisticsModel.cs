using System;
using System.Collections.Generic;
using meetup_rest_api.Core.Entity;

namespace meetup_rest_api.Features.Admin.Statistics
{
    public class StatisticsModel
    {

        //Consts
        private const string CHNU = "ЧНУ";
        private const string CHDTU = "ЧДТУ";
        private const string CSBC = "ЧДБК";
        private const string STUDENT = "Відвідую ВНЗ";
        private const string WORK = "Працюю в IT";
        private const string IT = "Хочу в IT";
        //

        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public int Registrations { get; set; }


        public int Chnu { get; set; }
        public int Chdtu { get; set; }
        public int Csbc { get; set; }

        // Добавить поле с количеством visited посетителей 
        public int Student { get; set; }
        public int Work { get; set; }
        public int It { get; set; }

        public Dictionary<string, int> sources { get; set; } =  new Dictionary<string, int>();
        internal StatisticsModel CountGuest(MeetupGuest guest)
        {
            Registrations++;

            switch (guest.Institution?.Name)
            {
                case CHNU: Chnu++; break;
                case CHDTU: Chdtu++; break;
                case CSBC: Csbc++; break;
                default: break;
            }

            switch (guest.Activity?.Name)
            {
                case STUDENT: Student++; break;
                case WORK: Work++; break;
                case IT:It++; break;
                default: break;
            }

            if(sources.ContainsKey(guest.Source)) sources[guest.Source]++;
            else sources.Add(guest.Source, 1);

            return this;
        }

        internal StatisticsModel FillInfo(Meetup meetup)
        {
            Id = meetup.Id;
            Title = meetup.Title;
            Date = meetup.BeginningAt;
            return this;
        }
    }
}