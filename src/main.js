const root = document.documentElement;
const entries = document.querySelectorAll(".entry");
const revealItems = document.querySelectorAll(".reveal");
const chatDialog = document.querySelector("#sandeep-chat");
const chatOpen = document.querySelector("[data-chat-open]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatSubmit = document.querySelector("[data-chat-submit]");
const chatThread = document.querySelector("[data-chat-thread]");

root.dataset.ready = "true";

const setAccent = (entry) => {
  root.style.setProperty("--active-accent", entry.dataset.accent || "#f4f2e8");
};

entries.forEach((entry) => {
  entry.addEventListener("pointermove", (event) => {
    const rect = entry.getBoundingClientRect();
    entry.style.setProperty("--x", `${event.clientX - rect.left}px`);
    entry.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });

  entry.addEventListener("pointerenter", () => setAccent(entry));
  entry.addEventListener("focusin", () => setAccent(entry));
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.dataset.visible = "true";
          observer.unobserve(item.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => {
    item.dataset.visible = "true";
  });
}

const responses = [
  {
    terms: ["openai", "latest", "current", "incoming"],
    answer:
      "Sandeep is incoming at OpenAI as a Member of Technical Staff intern in San Francisco for Summer 2026.",
  },
  {
    terms: ["meta", "superintelligence", "pytorch", "compiler"],
    answer:
      "Previously, Sandeep worked at Meta Superintelligence Lab on the PyTorch Compiler team, building torch.compile and torch.distributed diagnostics for multi-GPU jobs.",
  },
  {
    terms: ["tlparse", "project", "rust", "python", "distributed", "trace"],
    answer:
      "The featured project is a multi-rank version of tlparse for distributed TORCH_TRACE reports, built around tlparse's Rust and Python toolchain.",
  },
  {
    terms: ["ucla", "school", "education", "degree", "college"],
    answer:
      "Sandeep is studying Computer Science at UCLA, with activities including ACM and IM Soccer, and recognition on the Dean's Honor List.",
  },
  {
    terms: ["research", "cores", "lab"],
    answer:
      "Sandeep was a research intern at UCLA CORES Lab, working on UAV signal detection, RF fingerprinting, and wireless-network data pipelines.",
  },
  {
    terms: ["award", "honor", "usaco", "amc", "aime"],
    answer:
      "His listed honors include USACO Silver Division Qualifier, AMC Distinction Award, and two AIME qualifications.",
  },
  {
    terms: ["contact", "linkedin", "github", "x", "social"],
    answer:
      "The bottom dock links to Sandeep's LinkedIn, GitHub, and X profiles.",
  },
];

const addMessage = (message, type) => {
  const bubble = document.createElement("p");
  bubble.className = `chat-message chat-message--${type}`;
  bubble.textContent = message;
  chatThread.append(bubble);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const answerQuestion = (question) => {
  const normalized = question.toLowerCase();
  const match = responses.find((item) => item.terms.some((term) => normalized.includes(term)));

  return (
    match?.answer ||
    "I can answer from the site content: OpenAI, Meta, tlparse, UCLA, CORES Lab, honors, and contact links."
  );
};

if (chatDialog && chatOpen && chatForm && chatInput && chatSubmit && chatThread) {
  chatOpen.addEventListener("click", () => {
    if (typeof chatDialog.showModal === "function") {
      chatDialog.showModal();
    } else {
      chatDialog.setAttribute("open", "");
    }

    window.setTimeout(() => chatInput.focus(), 0);
  });

  chatDialog.addEventListener("click", (event) => {
    if (event.target === chatDialog) {
      chatDialog.close();
    }
  });

  chatInput.addEventListener("input", () => {
    chatSubmit.disabled = chatInput.value.trim().length === 0;
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = chatInput.value.trim();
    if (!question) {
      return;
    }

    addMessage(question, "user");
    chatInput.value = "";
    chatSubmit.disabled = true;

    window.setTimeout(() => {
      addMessage(answerQuestion(question), "assistant");
    }, 180);
  });
}
