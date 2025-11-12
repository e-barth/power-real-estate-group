const observeCookieBtn = () => {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    const cookieBtn = document.querySelector(".cookie-btn.accept");

    if (cookieBtn) {
      cookieBtn.click();
      observer.disconnect();
    }
  });

  observer.observe(targetNode, config);

  setTimeout(() => observer.disconnect(), 10000);
};

observeCookieBtn();


(function checkSiteDataLayer() {
  if (!Array.isArray(window.siteDataLayer)) {
    setTimeout(checkSiteDataLayer, 1000);
  } else {
    var originalPush = window.siteDataLayer.push;

    window.siteDataLayer.push = function (data) {
      if (
        data &&
        data.eventCategory &&
        data.event === "ads-ga-event" &&
        data.eventCategory.includes("powerreteam-register")
      ) {
        pushWebDrvnRegistrationEvent();
      } else if (
        data &&
        data.eventName &&
        data.eventName.includes("lead-address") &&
        data.event.includes("common-ga-event-evaluationSubmitAddress")
      ) {
        pushLoftyAddressEvent();
      }

      return originalPush.apply(window.siteDataLayer, arguments);
    };
  }
})();

function pushWebDrvnRegistrationEvent(retries = 13) {
  if (window.stateJson && window.stateJson.user && window.stateJson.user.user) {
    window.siteDataLayer.push({
      event: "webdrvn_registration",
    });
    window.customSiteDataLayer.push({
      event: "webdrvn_registration",
    });
    window.dataLayer.push({
      event: "webdrvn_registration",
    });
  } else if (retries > 0) {
    setTimeout(function () {
      pushWebDrvnRegistrationEvent(retries - 1);
    }, 500);
  } else {
    console.warn("User data not available after multiple retries.");
  }
}

function pushLoftyAddressEvent() {
  window.siteDataLayer.push({
    event: "lofty_address",
  });
  window.customSiteDataLayer.push({
    event: "lofty_address",
  });
  window.dataLayer.push({
    event: "lofty_address",
  });
}