 <script>
    // Small JS to enable theme toggling, basic form, and tiny interactions.
    (function(){
      const themeBtn = document.getElementById('themeBtn');
      const yearEl = document.getElementById('year');
      yearEl.textContent = new Date().getFullYear();

      // Apply saved theme or system preference
      const saved = localStorage.getItem('theme');
      if(saved === 'light') document.documentElement.style.setProperty('--bg','#f7f6f3');
      if(saved === 'light') themeBtn.textContent = '☀️';

      themeBtn.addEventListener('click', ()=>{
        const current = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
        const isDark = current === '#0f1113' || current === '#0b0c0d';
        if(isDark){
          // switch to light
          document.documentElement.style.setProperty('--bg','#f7f6f3');
          document.documentElement.style.setProperty('--card','#ffffff');
          document.documentElement.style.setProperty('--muted','#454545');
          themeBtn.textContent = '☀️';
          themeBtn.setAttribute('aria-pressed','true');
          localStorage.setItem('theme','light');
        } else {
          // switch to dark
          document.documentElement.style.setProperty('--bg','#0f1113');
          document.documentElement.style.setProperty('--card','#151617');
          document.documentElement.style.setProperty('--muted','#b9b9b9');
          themeBtn.textContent = '🌙';
          themeBtn.setAttribute('aria-pressed','false');
          localStorage.setItem('theme','dark');
        }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', e=>{
          const href = a.getAttribute('href');
          if(href === '#') return;
          e.preventDefault();
          document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        });
      });

      // Simple contact form handler — opens mail client as fallback
      const form = document.getElementById('contactForm');
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if(!name||!email||!message){ alert('Please fill all fields.'); return; }
        // Open mail client with prefilled content
        const subject = encodeURIComponent('Portfolio contact from ' + name);
        const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
        window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
      });

      // Tiny helper functions used by project buttons (placeholder actions)
      window.openDemo = function(e){ e.preventDefault(); alert('Replace with your live demo URL.'); }
      window.openCode = function(e){ e.preventDefault(); alert('Replace with your code repo URL.'); }

      // Resume download (example: triggers a small text resume — replace with your PDF path)
      document.getElementById('downloadResume').addEventListener('click', function(e){
        e.preventDefault();
        const resumeText = `Your Name\nWeb Developer\n\nExperience:\n- ...`;
        const blob = new Blob([resumeText], {type:'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'YourName_Resume.txt';
        document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      });

      // Animate skill bars after viewport enter
      const bars = document.querySelectorAll('.bar > span');
      const onIntersect = (entries, obs) => {
        entries.forEach(en=>{ if(en.isIntersecting){ en.target.style.width = en.target.style.width || en.target.getAttribute('style').replace(/.*width:\s*/,''); obs.unobserve(en.target); } });
      };
      try{
        const io = new IntersectionObserver(onIntersect,{threshold:0.2});
        bars.forEach(b=>{ // capture inline width, reset then observe
          const s = b.getAttribute('style');
          const match = /width:\s*([0-9]+%)/.exec(s);
          const w = match? match[1] : '70%';
          b.style.width = '0%';
          b.setAttribute('data-target', w);
          // restore target width on intersection
          b.setAttribute('style','width:'+w);
          io.observe(b);
        });
      }catch(err){ /* IntersectionObserver fallback: set widths */ bars.forEach(b=>b.style.width = b.style.width || b.getAttribute('style').replace(/.*width:\s*/,'')); }

    })();
  </script>