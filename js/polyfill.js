(function (e) {
      e.closest = e.closest || function (css) {
            var node = this;
            while (node) {
                  if (node.matches(css)) return node;
                  else node = node.parentElement;
            }
            return null;
      }
})(Element.prototype);


// код взят отсюда https://developer.mozilla.org/ru/docs/Web/API/Element/closest , на случай если метода closest  нет у барузера,  то испольузется этот код