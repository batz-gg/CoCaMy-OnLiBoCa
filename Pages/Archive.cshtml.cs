/*using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Blog.Pages
{
    public class ArchiveModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}*/


using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Blog.Models;

namespace Blog.Pages
{
    public class ArchiveModel : PageModel
    {
        public readonly List<BlogPost> Archive = new List<BlogPost>
    {
      new BlogPost("One Pot Thai-Style Rice", new DateTime(2020, 1, 24), "This is a famous dish popularized in Thailand. Although the recipe varies from cook to cook and region to region, this is a good attempt at recreating what I ate from Thai-owned hole-in-the-wall restaurants in Okinawa, Japan. Key to the flavor are the sugar levels, unsalted peanuts, peanut oil, and either oyster or fish sauce."),
      new BlogPost("Balsamic Glazed Salmon Fillets", new DateTime(2020, 1, 20), "A glaze featuring balsamic vinegar, garlic, honey, white wine and Dijon mustard makes baked salmon fillets extraordinary."),
      new BlogPost("Spicy Garlic Lime Chicken", new DateTime(2019, 9, 4), "A delightful chicken dish with a little spicy kick. Serve with rice and your favorite vegetable."),
      new BlogPost("Mushroom Pork Chops", new DateTime(2019, 6, 14), "Quick and easy, but very delicious. One of my family's favorites served over brown rice."),
    };

        public BlogPost Displayed { get; set; }

        public void OnGet(int index)
        {
            if (index >= Archive.Count || index < 0)
            {
                Displayed = new BlogPost("n/a", new DateTime(0001, 01, 01), "n/a");
            }
            else
            {
                Displayed = Archive[index];
            }
        }
    }
}