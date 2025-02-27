export const SelectTraveleslist=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people:'2 People'},
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friend',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about costs",
        icon:'💸'
    }
]


export const AI_PROMPT='Generate travel plan for location:{location} for {totaldays} days for {traveler} with a {Budget} budget, Give me a hotels options list with HotelName ,hotel address, price ,hotel image url gei coordinates ,rating ,descriptions and suggest itinerary with placename ,place details, place image url,geo coordinates ,ticket pricing rating ,time travel each of the location for  {totaldays} days with each day plan with best time to visit in json format'