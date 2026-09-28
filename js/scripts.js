/**
 * Lasitha Dilshan Thilakarathna - Portfolio Scripts
 * Vanilla JavaScript (ES6+) for interactive features, AI terminal simulator,
 * project filters, copy toast, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect for Hero Roles
  const roles = [
    'AI Engineer',
    'Generative AI Specialist',
    'RAG & Agentic AI Architect',
    'Enterprise Full-Stack Developer',
    'FastAPI & Python Expert'
  ];

  const roleElement = document.getElementById('typing-role');
  if (roleElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 40;
    const holdDuration = 1800;

    function typeLoop() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = holdDuration;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 2. Sticky Navbar & Active Section ScrollSpy
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar glass effect on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }

    // ScrollSpy active state
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Scroll to Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'genai' && category.includes('genai'))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive AI Terminal Simulator ("Ask Lasitha's AI Agent")
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalChips = document.querySelectorAll('.terminal-chip');
  const terminalPromptText = document.getElementById('terminalPromptText');

  const knowledgeBase = {
    expertise: `> Query: RAG & Agentic AI Architecture
--------------------------------------------------
Lasitha is an AI Engineer with 5 years of industry experience specializing in:
• Agentic AI Workflows: Multi-agent planning, Google ADK & LangChain orchestrations.
• Enterprise RAG Pipelines: Context-aware document indexing, chunking, and semantic retrieval using FAISS, ChromaDB, and Pinecone.
• LLMs Integrated: OpenAI (GPT-4o), Google Gemini, AWS Bedrock, and Hugging Face models.
• Production Microservices: Streaming FastAPI backend services, JSON schema extraction, and enterprise validation pipelines.`,

    virtusax: `> Query: VirtusaX & MLR Platform Projects
--------------------------------------------------
1. VirtusaX - Enterprise Functions AI (2026 - Present):
   • Enterprise AI platform for intelligent automation and document intelligence across multi-tier enterprise functions.
   • Scaled FastAPI microservices with FAISS vector databases and Angular dashboards.
2. Investment AI-MLR Process (2025 - 2026):
   • AI compliance & regulatory assistant with OCR document parsing, video disclaimer extraction, and real-time streaming APIs.
   • Accelerated medical-legal-regulatory review cycles dramatically.`,

    awards: `> Query: Hackathon Victories & Certifications
--------------------------------------------------
🏆 1st Place Winner - Virtusa Agentic AI Hackathon (2025)
   • Built "Travel Mate", an autonomous multi-agent travel assistant coordinating itineraries and flight/hotel planning via OpenAI and Google ADK.
📜 Certifications:
   • Career Essentials in Generative AI (Microsoft & LinkedIn)
   • Certified Generative AI Assisted Engineer (Virtusa, 2024)
   • Custom Generative AI Pathway (Virtusa, 2024)
   • Arctic Code Vault Contributor (GitHub Archive Program)`,

    research: `> Query: Academic Background & Publications
--------------------------------------------------
🎓 Education:
   • MSc in Information Technology - SLIIT (2023 - Present)
   • B.Eng. in Software Engineering - IIC University (2018 - 2021) | Second Upper Division | GPA 3.56
📚 Publication:
   • "Optimizing User Experience Through Machine Learning: A Review of Key Tools and Technologies" (2024)
   • In-depth review covering ML in UI/UX, bias mitigation, PyTorch, and TensorFlow integrations.`,

    contact: `> Query: Contact Information
--------------------------------------------------
• Email: dilshantilakaratne29@gmail.com
• Phone: +94 77 313 0036 (Colombo, Sri Lanka)
• LinkedIn: linkedin.com/in/lasitha-thilakarathna-3027ab120
• GitHub: github.com/lasithadilshan
• Availability: Open to AI Engineering & GenAI Innovation collaborations.`
  };

  let typingTimer = null;

  function streamTerminalOutput(text) {
    if (!terminalOutput) return;
    if (typingTimer) clearInterval(typingTimer);

    terminalOutput.textContent = '';
    let i = 0;
    typingTimer = setInterval(() => {
      terminalOutput.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typingTimer);
      }
    }, 12);
  }

  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const topic = chip.getAttribute('data-topic');
      const queryLabel = chip.textContent.trim();
      if (terminalPromptText) {
        terminalPromptText.textContent = queryLabel;
      }
      if (knowledgeBase[topic]) {
        streamTerminalOutput(knowledgeBase[topic]);
      }
    });
  });

  // 6. One-Click Copy to Clipboard with Toast Notification
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${label} to clipboard!`);
  }

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 7. CV Export Modal Handling
  const cvModalOverlay = document.getElementById('cvModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openCvModal = function() {
    if (cvModalOverlay) {
      cvModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCvModal = function() {
    if (cvModalOverlay) {
      cvModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeCvModal);
  }

  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) {
        window.closeCvModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModalOverlay && cvModalOverlay.classList.contains('open')) {
      window.closeCvModal();
    }
  });

  window.triggerPrintCv = function() {
    window.closeCvModal();
    setTimeout(() => {
      window.print();
    }, 250);
  };
});
