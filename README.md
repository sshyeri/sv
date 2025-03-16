## StradVision Frontend Screening Test

### Overview

This project is a boilerplate for StradVision Frontend screening test. It provides a starting point for candidates to showcase their frontend development skills. The boilerplate includes a basic folder structure, configuration files, and some initial code setup. Candidates can build upon this boilerplate to complete the screening test tasks and demonstrate their abilities in HTML, CSS, and JavaScript. Good luck with the test👍

### Getting Started

Follow these instructions to set up and run the project.

#### Prerequisites

- Node.js (version > 20) and npm installed on your machine.

#### Steps

1. Clone the repository.
2. Install the dependencies
3. Run the development server

### Submission

- Ensure your code is clean, well-documented, and follows best practices.
- Submit the project repository link or zip file and any additional notes in the README.md.



### Notes

#### 1. bouncing-ball

- 클릭 이벤트 및 입력 처리
  - 문제에서는 “스페이스바를 더블 클릭하면”이라는 표현이 있었으나, 스페이스바는 키보드 입력이고 클릭은 마우스 이벤트입니다.
  - 이를 모두 충족하기 위해 온스크린 버튼 클릭과 키보드 스페이스바 입력 두 가지를 모두 동일하게 취급하도록 구현하였습니다.
  - 더블 클릭(dblclick) 이벤트의 불안정성(브라우저에 따라 “click, click, dblclick” 순서가 일정하지 않음)을 보완하기 위해, dblclick 이벤트에 의존하지 않고 마우스의 “click” 이벤트를 직접 카운트하여 두 번 연속 입력 시 공을 낙하시키고, 세 번 연속 입력 시 원래 위치로 리셋하는 로직을 구현하였습니다.
- 시뮬레이션 대상 및 물리 원리
  - 초등학생을 대상으로 한 낙하 실험 시뮬레이션이므로, 공기저항 등 외부 요인을 고려하지 않고 이상적인 자유 낙하(중력 가속도 약 9.8 m/s²)를 적용하였습니다.
  - 이를 통해 물체의 질량에 관계없이 낙하 속도가 동일하다는 원리를 직관적으로 전달할 수 있도록 설계하였습니다.

#### 2. road-observer

- 컴포넌트 분리 및 모듈화
  - 각 기능(차량/observer 렌더링, 모달 UI, SVG 컨테이너 관리)을 별도의 컴포넌트나 유틸리티 함수로 분리하여, 코드의 가독성과 유지보수를 향상시켰습니다.
  - 예를 들어, VehicleContainer, VehicleModal 그리고 SVG.js 관련 유틸 함수들을 분리하여 재사용성과 테스트 용이성을 높였습니다.
- 성능 최적화
  - 도로와 차량 렌더링에 있어서, 객체 수가 약 100개 내외인 상황에서는 SVG의 DOM 기반 렌더링이 적합하다고 판단하여 SVG.js를 사용하였습니다.
  - 또한, 불필요한 리렌더링을 방지하기 위해 useEffect 의존성 관리와 useMemo, useCallback을 활용하여 재계산 및 렌더링 비용을 최소화하였습니다.
- 수학적 계산과 가시성 처리
  - observer의 시야(FOV)와 차량의 위치/크기를 기반으로, 각 차량의 시야 내 가시 영역 비율(fovCoverageRatio)을 계산하는 로직을 고민했습니다.
  - 차량의 방향에 따라 계산 로직이 중복되는 것을 방지하고자 observer의 시야를 기준으로 좌표를 변환했습니다.
