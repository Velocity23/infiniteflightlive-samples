﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfiniteFlightLiveClient;
using InfiniteFlightLiveClient.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace IfLiveCsharp.Pages
{
    public class IndexModel : PageModel
    {
        public List<SessionInfo> Sessions { get; set; }
        public List<FlightEntry> Flights { get; set; }
        public List<FlightPlanEntry> FlightPlans { get; set; }
        public List<AtcEntry> AtcFacilities { get; set; }
        public new UserGradeInfo User { get; set; }

        public async Task<ActionResult> OnGetAsync()
        {
            Sessions = await Client.GetSessionsAsync();
            Flights = await Client.GetFlightsAsync(Sessions.FirstOrDefault().Id);
            FlightPlans = await Client.GetFlightPlansAsync(Sessions.FirstOrDefault().Id);
            AtcFacilities = await Client.GetAtcFacilitiesAsync(new Guid("7e5dcd44-1fb5-49cc-bc2c-a9aab1f6a856"));
            User = await Client.GetUserGradeAsync(Flights.FirstOrDefault().UserId);
            return Page();
        }
    }
}
