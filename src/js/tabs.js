/* -------------------------------------------------------------------------- */
/*                                  Tabs                                      */
/* -------------------------------------------------------------------------- */

const tabsInit = () => {

  const tabsNavs = document.querySelectorAll('[data-tabs]');

  const updateIndicator = (indicator, tabs, tabnavCurrentItem) => {
    const left =
        tabnavCurrentItem.getBoundingClientRect().left -
        tabs.getBoundingClientRect().left;
    const right = tabs.offsetWidth - (left + tabnavCurrentItem.offsetWidth);

    indicator.style.left = `${left}px`;
    indicator.style.right = `${right}px`;
  };

  if (tabsNavs.length) {
    tabsNavs.forEach((tabs) => {
      const tabnavCurrentItem = tabs.querySelector('.nav-bar-item.active');
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      tabs.querySelector('.nav-bar').appendChild(indicator);

      updateIndicator(indicator, tabs, tabnavCurrentItem);

      tabs.querySelectorAll('.nav-bar-item').forEach((tabnavItem) => {
        tabnavItem.addEventListener('click', () => {
          const currentIndex = Array.from(tabnavItem.parentNode.children).indexOf(
            tabnavItem
          );
          const tabContent =
            tabs.querySelector('.tab-contents').children[currentIndex];

          tabnavItem.parentNode
            .querySelectorAll('.nav-bar-item')
            .forEach((item) => {
              item?.classList?.remove('active');
            });
          tabnavItem.classList.add('active');

          tabContent.parentNode
            .querySelectorAll('.tab-content')
            .forEach((content) => {
              content?.classList?.remove('active');
            });
          tabContent.classList.add('active');

          updateIndicator(indicator, tabs, tabnavItem);

          const preIndex = tabs.getAttribute('data-preIndex');
          if (currentIndex - preIndex <= 0) {
            indicator.classList.add('transition-reverse');
          } else {
            indicator.classList.remove('transition-reverse');
          }
          tabs.setAttribute('data-preIndex', currentIndex);
        });
      });
      window.addEventListener('resize', () => {
        updateIndicator(
          indicator,
          tabs,
          tabs.querySelector('.nav-bar-item.active')
        );
      });
    });
  }
};

export default tabsInit;
