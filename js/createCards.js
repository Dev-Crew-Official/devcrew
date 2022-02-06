// Global variables
const TIKTOK = "TikTok";
const TWITTER = "Twitter";
const YOUTUBE = "YouTube";
const SOCIALS = [TIKTOK, TWITTER, YOUTUBE];

function getSocialHref(social, handle) {
  // Generate personal social media URL
  if (social === TIKTOK) { baseUrl = "https://tiktok.com/@" }
  else if (social === TWITTER) { baseUrl = "https://twitter.com/" }
  else if (social === YOUTUBE) { baseUrl = "" }
  else { return "#" };
  return baseUrl + handle
}

function getSocialText(social, handle) {
  if (social === YOUTUBE) {
    return YOUTUBE
  };
  return handle;
}

function addSocial(cardBody, member, social) {
  let lowerCaseSocial = social.toLowerCase();
  let handle = member[lowerCaseSocial];

  // Check if member has entered info for given social channel
  if (typeof handle !== 'undefined') {

    // Container for social media link
    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");

    // Logo for social media
    let socialLogo = document.createElement("img");
    socialLogo.src = `images/${social.toLowerCase()}-logo.png`;
    socialLogo.width = "25";
    socialLogo.classList.add("m-3");

    // Create a tag
    let cardTitleLink = document.createElement("a");
    cardTitleLink.href = getSocialHref(social, handle);
    cardTitleLink.target = "_blank";
    cardTitleLink.classList.add("text-white")

    // Text inside of link
    textNode = document.createTextNode(getSocialText(social, handle));

    // Assemble pieces
    cardTitleLink.appendChild(textNode);
    cardTitle.appendChild(socialLogo);
    cardTitle.appendChild(cardTitleLink);
    cardBody.appendChild(cardTitle);
  };
}

function createCards(members) {
  // Location to create cards for each member
  let display = document.getElementById("content");

  members.forEach(member => {

    // Container for the member's card
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("col-lg-4", "col-sm-12", "mb-3");
    display.appendChild(outerDiv);

    // Member's card
    let card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "mb-3", "h-100");

    // Connect card to container
    outerDiv.appendChild(card);

    // Top portion of card with member name
    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "text-center");
    let memberName = document.createElement("h2");
    let textNode = document.createTextNode(member.name);

    // Add top portion content to card
    memberName.appendChild(textNode);
    cardHeader.appendChild(memberName);
    card.appendChild(cardHeader);

    // Create container for main card content
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // Create and append social media links for each member
    SOCIALS.forEach(social => {
      addSocial(cardBody, member, social);
    });
  });
}

function shuffle(array) {
  // Fisher-Yates shuffle
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Create a card for each member in random order
let members = fetch("members.json")
  .then(response => response.json())
  .then(function (result) {
    createCards(shuffle(result.members));
  });
