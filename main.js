(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"bbcf2270-d3d0-40fa-b649-4e22b6be7820","Content-Type":"application/json"}};function t(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t)}function o(t,n,r){var o=t.target.closest(".card__like-button");o.classList.contains("card__like-button_is-active")?fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return e.json()})).then((function(e){o.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})):fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return e.json()})).then((function(e){o.classList.add("card__like-button_is-active"),r.textContent=e.likes.length}))}function c(t,n){t.target.closest(".places__item").remove(),fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers})}var a=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button_disabled")):(t.disabled=!0,t.classList.add("popup__button_disabled"))},u=document.querySelector(".places__list");function i(e){var t=function(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__title"),a=o.querySelector(".card__image"),u=o.querySelector(".card__delete-button"),i=o.querySelector(".card__like-button");a.src=e.link,a.alt=e.name,c.textContent=e.name;var s=o.querySelector("#counter");return s.textContent=e.likes,u.addEventListener("click",(function(){t(event,e.cardID)})),i.addEventListener("click",(function(){n(event,e.cardID,s)})),"a93de75c814e52d57e28a89d"===e.ownerID&&u.classList.remove("hidden"),a.addEventListener("click",(function(t){r(e)})),o}(e,c,o,g);u.append(t)}var s=document.querySelector(".popup_type_image"),l=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__add-button"),p=Array.from(document.querySelectorAll(".popup")),_=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),m=f.querySelector(".popup__form"),y=_.querySelector(".popup__form"),v=y.querySelector(".popup__input_type_name"),h=y.querySelector(".popup__input_type_description"),S=document.querySelector(".overlay"),q=document.querySelector(".popup_type_new-avatar"),b=q.querySelector(".popup__form"),k=b.querySelector("#popup__input-avatar"),L=q.querySelector(".popup__button"),E=_.querySelector(".popup__button"),C=f.querySelector(".popup__button");function g(e){var t=s.querySelector(".popup__caption"),n=s.querySelector(".popup__image");t.textContent=e.name,n.src=e.link,n.alt=e.name,r(s)}S.addEventListener("click",(function(){r(q)})),l.addEventListener("click",(function(){var e=document.querySelector(".profile__title"),t=document.querySelector(".profile__description");v.value=e.textContent,h.value=t.textContent,r(_)})),d.addEventListener("click",(function(){return r(f)})),p.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return n(e)})),window.addEventListener("click",(function(t){t.target===e&&n(e)}))})),b.addEventListener("submit",(function(t){t.preventDefault(),fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:k.value})}).then((function(e){return e.json()})).then((function(e){document.querySelector("#avatar").style.backgroundImage="url(".concat(e.avatar,")")})),L.textContent="Сохранение...",n(q)})),y.addEventListener("submit",(function(t){t.preventDefault(),fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:v.value,about:h.value})}).then((function(e){return e.json()})),document.querySelector(".profile__title").textContent=v.value,document.querySelector(".profile__description").textContent=h.value,E.textContent="Сохранение...",n(_)})),m.addEventListener("submit",(function(t){t.preventDefault();var r=m.querySelector(".popup__input_type_card-name"),o=m.querySelector(".popup__input_type_url");fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r.value,link:o.value})}).then((function(e){return e.json()})).then((function(e){i({name:e.name,link:e.link,likes:e.likes.length,ownerID:e.owner._id,cardID:e._id}),C.textContent="Сохранение...",n(f)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){var t,n,r;t=e,n=Array.from(t.querySelectorAll(".popup__input")),r=t.querySelector(".popup__button"),a(n,r),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){if(t.validity.patternMismatch){var n=t.dataset.errorMessage;t.setCustomValidity(n)}else t.setCustomValidity("");t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.textContent="",n.classList.remove("popup__input-error_active")}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),r.textContent=n,r.classList.add("popup__input-error_active")}(e,t,t.validationMessage)}(t,e),a(n,r)}))}))})),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.json()})).then((function(e){var t=e.name,n=e.about;document.querySelector("#name").textContent=t,document.querySelector("#about").textContent=n,document.querySelector("#avatar").style.backgroundImage="url(".concat(e.avatar,")")})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){var t=new URL(e.link,"file:///C:/Users/HUAWEI/mesto-project-ff/src/index.js");i({name:e.name,link:t,likes:e.likes.length,ownerID:e.owner._id,cardID:e._id})}))}))})();