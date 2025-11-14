(function () {

  // ---- CONFIGURATION ----
  const TARGET_SELECTOR = "footer.md-footer.layout2:not(.inner)";
  const MAX_ATTEMPTS = 30; 
  const INTERVAL = 100;   

  // ---- YOUR FORM HTML ----
  const formHTML = `
    <div id="contact" class="md-form layout3 mg-bg"
    style="background-size: cover; background-position: center center; background-repeat: no-repeat; background-image: url(&quot;https://cdn.chime.me/image/fs/sitebuild/2024522/6/original_7ffdb5e5-510e-4e59-8fe8-6f69e8216aec-png.webp&quot;); padding-top: 80px; padding-bottom: 80px; --g-primary-color: #fff; --g-text-color: rgba(255,255,255,0.7); --g-tip-color: rgba(168,168,168,1); --g-btn-background: #fff; --g-btn-color: #191919; --g-bg-color: #191919; --input-border-color: rgba(218, 218, 218, 0.5);"
    id="contact">
    <div class="mask" style="background:rgba(25, 25, 25, 0.9);"></div>
    <div class="md-form-container f-col">
      <div class="site-title left" style="font-size:var(--mg-title-size);">
        <h2>GET IN TOUCH!</h2>
      </div>
      <form novalidate="" class="info-form2">
        <div class="input-content">
          <div class="basic-info">
            <div class="v-input fullname basic-info-input input-box" >
              <div class="input-container"><span class="label-top">Name</span><input type="text" name="fullname"
                  aria-label="fullname" placeholder="Name" maxlength="30" autocomplete="off" value=""></div>
              <p style="display:none;" class="mg-error"></p>
            </div>
            <div class="v-input phone basic-info-input input-box">
              <div class="input-container"><span class="label-top">Phone*</span> <input type="tel" name="phone"
                  aria-label="phone" placeholder="Phone*" value="" autocomplete="off"></div>
              <p style="display:none;" class="mg-error"></p>
            </div>
            <div class="v-input email basic-info-input input-box">
              <div class="input-container"><span class="label-top">Email*</span> <input type="email" name="email"
                  aria-label="email" placeholder="Email*" maxlength="50" autocomplete="off" value=""></div>
              <div style="display:none;" class="email-suggestion"></div>
              <p style="display:none;" class="mg-error"></p>
            </div>
          </div>
          <div class="v-input message">
            <div class="input-container"><span class="label-top">Message</span> <textarea name="question"
                aria-label="question" placeholder="Message" autocomplete="off"></textarea></div>
            <p style="display:none;" class="mg-error"></p>
          </div>
        </div>
        <div class="disclaimer-wrap opt-in">
          <div class="tcpa-consent">
            <div class="noParty disclaimer-item consent-item noTop">
              <div class="checkbox-wrapper">
                <input type="checkbox" name="agreement" id="agreement">
              </div>
              <div class="disclaimer-content party-consent" style="--g-text-color:rgba(168,168,168,1);">
                <p>By checking this box, I agree by electronic signature to the <a
                    href="/site/electronic-disclosure-consent" target="_blank" class="privacy-link">Electronic Disclosure
                    Consent Agreement</a>; to receive recurring marketing communication from or on behalf of Power Real
                  Estate Group, including auto-dialed calls, texts, and artificial/prerecorded voice messages (message
                  frequency varies; data rates may apply; reply "STOP" to opt-out of texts or "HELP" for assistance); and
                  to the <a href="/site/privacy-terms#terms-of-service" target="_blank" class="privacy-link">Terms of
                    Service</a> and <a href="/site/privacy-terms#privacy-policy" target="_blank"
                    class="privacy-link">Privacy Policy</a> of this website. Consent not required to make a purchase. I
                  understand that I can call +1(714) 451-4605 to obtain direct assistance.</p>
              </div>
            </div>
          </div>
          <div class="custom-disclaimer-list"></div>
        </div>
        <div class="submit-content">
          <div class="submit-box"><button class="submit">SEND A MESSAGE</button></div>
        </div>
      </form>
      <div class="form-toast toast-mark" style="display:none;">
        <div class="toast-wrapper">
          <div class="toast-icon"><i class="icon-success iconfont"></i></div>
          <div class="toast-content">Thanks! I'll get back to you shortly.</div>
          <div class="toast-footer" style="display:none;"> <input type="button" class="toast-btn toast-btn1" value="Back"><input type="button" class="toast-btn toast-btn2" value="Go to Home Page"></div>
        </div>
      </div>
    </div>
  </div>
  `;

  function waitForFooter(attempt = 0) {
    const footer = document.querySelector(TARGET_SELECTOR);

    if (footer) {
      return Promise.resolve(footer);
    }

    if (attempt >= MAX_ATTEMPTS) {
      console.warn("Contact form: footer not found.");
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(waitForFooter(attempt + 1));
      }, INTERVAL);
    });
  }

  function insertForm(footer) {
    if (!footer) return;
    footer.insertAdjacentHTML("beforebegin", formHTML);
  }

  waitForFooter().then(footer => {
    if (!footer) return;
    insertForm(footer);
  });

})();
