document.addEventListener("DOMContentLoaded", () => {
  // querySelectorAll로 불러오면, 배열의 기능을 못쓰므로 배열로 가져오기
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false; // 저화질 이미지 버리고 고화질 가져올지 정함. 후에 setTimeOut을 통해 업데이트하며 확인하는 작업 반복

  const lazyLoad = () => {
    if (active === false) {
      active = true;
      setTimeout(() => { // 스크롤 발생 시 500ms 후에 저화질 이미지 리스트 확인
        lazyImages = lazyImages.reduce((arr, img) => {
          // 자기가 보고 있는 화면에 이미지가 들어왔는지 확인
          const isViewingImg = img.getBoundingClientRect().top <= window.innerHeight;
          if (isViewingImg && window.getComputedStyle(img).display !== "none") {
            // dataset에 설정해놓은 원래의 고화질 이미지 삽입
            img.src = img.dataset.src;
            // lazy 클래스 지움
            img.classList.remove("lazy");
            // 그 후 arr에 넣지 않으므로 자동으로 목록에서 이미지 삭제
          } else arr.push(img);
          return arr;
        }, []);
        
        if (!lazyImages.length) {
          // 위의 작업을 반복하여 모든 이미지가 삭제되었다면 이벤트 제거
          document.removeEventListener("scroll", lazyLoad);
        } else active = false;
      }, 500);
    }
  }

  // scroll에 이벤트 추가
  document.addEventListener("scroll", lazyLoad);
})