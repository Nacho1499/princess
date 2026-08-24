/* =====================================================
   CUSTOMER SUPPORT PORTFOLIO
   Emmanuel Manasseh
===================================================== */


/* =====================================================
   CUSTOMER SUPPORT SCENARIOS
===================================================== */

const scenarios = {

  angry: {

    title: "Angry Customer",

    customer:
      "“I've contacted support three times and nobody has fixed this. This is ridiculous!”",

    response:
      "I'm sorry you've had to contact us multiple times without getting the issue resolved. I understand how frustrating that must be. I'll review the details of your case and work with you to identify the next step toward resolving the issue.",

    why:
      "Acknowledges frustration, avoids defensiveness, takes ownership and moves the conversation toward resolution."

  },


  refund: {

    title: "Refund Request",

    customer:
      "“I was charged for something I didn't intend to purchase. I want my money back.”",

    response:
      "I'm sorry for the unexpected charge. I'll be happy to help you look into this. I'll first verify the transaction details and review the applicable refund policy. Once confirmed, I'll explain the available options and help you with the next step.",

    why:
      "Shows empathy while avoiding a promise before the transaction and refund policy have been verified."

  },


  technical: {

    title: "Technical Problem",

    customer:
      "“The website isn't working for me.”",

    response:
      "I'm sorry you're experiencing this issue. Let's troubleshoot it together. Could you tell me what happens when you try to access the website and which browser or device you're using? I'll use that information to help identify the problem.",

    why:
      "Asks focused diagnostic questions instead of guessing at the cause."

  },


  order: {

    title: "Delayed Order",

    customer:
      "“My order was supposed to arrive two days ago. Where is it?”",

    response:
      "I'm sorry your order hasn't arrived as expected. I understand how inconvenient that can be. I'll help you check the order status and determine the next available solution.",

    why:
      "Acknowledges the delay and establishes a clear next action."

  }

};


/* =====================================================
   RENDER CUSTOMER SCENARIO
===================================================== */

const scenarioPanel =
  document.getElementById("scenarioPanel");


function renderScenario(key = "angry") {

  const scenario = scenarios[key];

  scenarioPanel.innerHTML = `

    <h3>
      ${scenario.title}
    </h3>

    <div class="customer-quote">

      ${scenario.customer}

    </div>

    <div class="response">

      <strong>
        My response
      </strong>

      <p>
        ${scenario.response}
      </p>

    </div>

    <p class="why">

      <strong>
        Why this works:
      </strong>

      ${scenario.why}

    </p>

  `;
}


renderScenario();


/* =====================================================
   SCENARIO BUTTONS
===================================================== */

document
  .querySelectorAll(".scenario-tab")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".scenario-tab")
        .forEach(btn => {

          btn.classList.remove("active");

        });


      button.classList.add("active");


      renderScenario(
        button.dataset.scenario
      );

    });

  });


/* =====================================================
   CUSTOMER SUPPORT TICKETS
===================================================== */

const tickets = [

  {
    id: "#1042",
    customer: "John Smith",
    issue: "Duplicate payment",
    priority: "High",
    status: "Open",

    response:
      "Thank you for bringing this to our attention. I'll help verify the transaction and guide you through the appropriate resolution."
  },


  {
    id: "#1041",
    customer: "Sarah Adams",
    issue: "Login problem",
    priority: "Medium",
    status: "In Progress",

    response:
      "I'll help you regain access. Let's first verify the account details and then work through the password-reset process."
  },


  {
    id: "#1040",
    customer: "David Okoro",
    issue: "Order delay",
    priority: "Medium",
    status: "Resolved",

    response:
      "Your order status has been reviewed and the available next step has been communicated to the customer."
  },


  {
    id: "#1039",
    customer: "Grace Bello",
    issue: "Account question",
    priority: "Low",
    status: "Resolved",

    response:
      "The customer's account question was answered clearly and the relevant self-service instructions were provided."
  }

];


const ticketList =
  document.getElementById("ticketList");

const ticketDetail =
  document.getElementById("ticketDetail");

const resolvedCount =
  document.getElementById("resolvedCount");


let resolved = 42;


/* =====================================================
   RENDER TICKETS
===================================================== */

function renderTickets() {

  ticketList.innerHTML = tickets
    .map((ticket, index) => {

      return `

        <div
          class="ticket-item ${index === 0 ? "active" : ""}"
          data-index="${index}"
        >

          <span
            class="priority ${ticket.priority.toLowerCase()}"
          >
            ${ticket.priority}
          </span>

          <strong>
            ${ticket.id} · ${ticket.issue}
          </strong>

          <span>
            ${ticket.customer} · ${ticket.status}
          </span>

        </div>

      `;

    })
    .join("");


  document
    .querySelectorAll(".ticket-item")
    .forEach(item => {

      item.addEventListener("click", () => {

        document
          .querySelectorAll(".ticket-item")
          .forEach(ticket => {

            ticket.classList.remove("active");

          });


        item.classList.add("active");


        renderTicket(
          Number(item.dataset.index)
        );

      });

    });

}


/* =====================================================
   DISPLAY SINGLE TICKET
===================================================== */

function renderTicket(index) {

  const ticket = tickets[index];


  ticketDetail.innerHTML = `

    <h3>
      ${ticket.id} — ${ticket.issue}
    </h3>

    <p class="muted">
      Customer: ${ticket.customer}
    </p>

    <div class="ticket-meta">

      <span>
        Priority: ${ticket.priority}
      </span>

      <span>
        Status: ${ticket.status}
      </span>

    </div>


    <strong>
      Suggested response
    </strong>


    <div class="ticket-response">

      ${ticket.response}

    </div>


    <div class="ticket-actions">

      <button
        class="small-btn primary"
        id="progressBtn"
      >
        Mark In Progress
      </button>


      <button
        class="small-btn"
        id="resolveBtn"
      >
        Resolve Ticket
      </button>


      <button
        class="small-btn"
        id="escalateBtn"
      >
        Escalate
      </button>

    </div>

  `;


  document
    .getElementById("progressBtn")
    .onclick = () => {

      updateTicket(
        index,
        "In Progress"
      );

    };


  document
    .getElementById("resolveBtn")
    .onclick = () => {

      updateTicket(
        index,
        "Resolved"
      );

    };


  document
    .getElementById("escalateBtn")
    .onclick = () => {

      showToast(
        "Ticket marked for escalation."
      );

    };

}


/* =====================================================
   UPDATE TICKET
===================================================== */

function updateTicket(index, status) {

  const ticket = tickets[index];


  if (
    ticket.status !== "Resolved" &&
    status === "Resolved"
  ) {

    resolved++;

  }


  ticket.status = status;


  resolvedCount.textContent =
    resolved;


  renderTickets();

  renderTicket(index);


  showToast(
    `${ticket.id} updated to ${status}.`
  );

}


renderTickets();

renderTicket(0);


/* =====================================================
   FAQ DATA
===================================================== */

const faqs = [

  [
    "Account & Login",
    "How do I reset my password?",
    "Use the password-reset option on the sign-in page and follow the verification instructions."
  ],

  [
    "Account & Login",
    "I can't access my account",
    "Verify your login details and use the recovery process. If access remains blocked, contact support."
  ],

  [
    "Billing",
    "Why was I charged?",
    "Review the transaction details and the relevant billing policy before confirming the reason for a charge."
  ],

  [
    "Billing",
    "How do I request a refund?",
    "Contact support with the transaction details so the request can be checked against the applicable refund policy."
  ],

  [
    "Orders",
    "Where is my order?",
    "Check the order status and tracking information. Support can help investigate a delayed order."
  ],

  [
    "Orders",
    "My order arrived damaged",
    "Document the issue and contact support with the order details and any requested evidence."
  ],

  [
    "Technical",
    "The website isn't loading",
    "Try refreshing the page, checking your connection and testing another supported browser."
  ],

  [
    "Technical",
    "The app keeps crashing",
    "Restart the app, check for updates and provide the device/app details to support if the problem continues."
  ],

  [
    "Technical",
    "I can't complete an action",
    "Describe the exact action, error message and device/browser being used so the issue can be investigated."
  ]

];


const faqGrid =
  document.getElementById("faqGrid");


/* =====================================================
   RENDER FAQ
===================================================== */

function renderFaq(filter = "") {

  const searchTerm =
    filter.trim().toLowerCase();


  const results =
    faqs.filter(faq =>
      faq
        .join(" ")
        .toLowerCase()
        .includes(searchTerm)
    );


  if (results.length === 0) {

    faqGrid.innerHTML = `

      <p class="muted">
        No matching articles found.
        Try another keyword.
      </p>

    `;

    return;

  }


  faqGrid.innerHTML =
    results
      .map(faq => {

        return `

          <article class="faq-card">

            <span class="eyebrow">
              ${faq[0]}
            </span>

            <h3>
              ${faq[1]}
            </h3>

            <p>
              ${faq[2]}
            </p>

          </article>

        `;

      })
      .join("");

}


renderFaq();


/* =====================================================
   FAQ SEARCH
===================================================== */

document
  .getElementById("faqSearch")
  .addEventListener("input", event => {

    renderFaq(
      event.target.value
    );

  });


/* =====================================================
   EMAIL EXAMPLES
===================================================== */

const emails = {

  complaint: {

    subject:
      "Follow-up Regarding Your Support Request",

    body:
`Hello [Customer Name],

Thank you for contacting us and for bringing this issue to our attention.

I understand how frustrating it can be when a problem prevents you from using the service as expected. I have reviewed the information available and would like to help you resolve this as quickly as possible.

[Explain solution or next step.]

Please let me know if you continue to experience the issue, and I will be happy to assist further.

Kind regards,
Jessica
Customer Support Representative`

  },


  technical: {

    subject:
      "Technical Support — Next Steps",

    body:
`Hello [Customer Name],

Thank you for the details you provided.

To help us identify the cause of the issue, please confirm the device and browser you are using and tell us what happens immediately before the problem occurs.

Once we have that information, we can determine the most appropriate troubleshooting step.

Kind regards,
Jessica
Customer Support Representative`

  },


  followup: {

    subject:
      "Checking In on Your Support Request",

    body:
`Hello [Customer Name],

I'm following up to make sure the issue we discussed has been resolved successfully.

If everything is working as expected, no further action is required. If you are still experiencing the problem, please reply with the latest details and I'll be happy to continue assisting you.

Kind regards,
Jessica
Customer Support Representative`

  }

};


const emailCard =
  document.getElementById("emailCard");


/* =====================================================
   RENDER EMAIL
===================================================== */

function renderEmail(key = "complaint") {

  const email = emails[key];


  emailCard.innerHTML = `

    <div class="email-header">

      <span>
        Subject
      </span>

      <strong>
        ${email.subject}
      </strong>

    </div>


    <div class="email-body">

      ${email.body}

    </div>

  `;

}


renderEmail();


/* =====================================================
   EMAIL TABS
===================================================== */

document
  .querySelectorAll(".email-tab")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".email-tab")
        .forEach(btn => {

          btn.classList.remove("active");

        });


      button.classList.add("active");


      renderEmail(
        button.dataset.email
      );

    });

  });


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const navToggle =
  document.getElementById("navToggle");

const navLinks =
  document.getElementById("navLinks");


navToggle.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");


  navToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

});


/* Close mobile menu after clicking a link */

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

    });

  });


/* =====================================================
   TOAST MESSAGE
===================================================== */

const toast =
  document.getElementById("toast");


function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   CURRENT YEAR
===================================================== */

document
  .getElementById("year")
  .textContent =
  new Date().getFullYear();