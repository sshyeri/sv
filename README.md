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

>  더블 클릭 이벤트의 불안정성을 보완하기 위해 마우스의 "click" 이벤트를 이용해 입력 횟수를 직접 관리하고, 스페이스바 입력은 온스크린 버튼과 키보드 입력을 동일하게 처리하여 사용자 인터랙션을 일관되게 구현하였습니다. 이러한 고려를 통해, 초등학생 대상의 낙하 실험 시뮬레이션이 보다 안정적이고 직관적으로 동작하도록 설계하였습니다.

- 클릭 이벤트
  - 문제에서 “스페이스바를 더블 클릭하면”이라고 제시되어 있는데, 일반적으로 클릭은 마우스 이벤트를 의미하고 스페이스바는 키보드 입력을 의미합니다.
  - 따라서 온스크린 버튼 클릭과 키보드 스페이스바 입력 두 가지 경우를 모두 고려하여 구현하였습니다.
- 더블 클릭 이벤트(dblclick)
  - 일부 브라우저에서는 더블 클릭 시 “click, click, dblclick”의 순서가 항상 일정하지 않을 수 있습니다.
  - 이 문제를 보완하기 위해 dblclick 이벤트에 의존하는 대신, 마우스의 “click” 이벤트를 사용하여 입력 횟수를 직접 카운트하도록 설계하였습니다.
  - 즉, 온스크린 버튼의 클릭 이벤트를 통해 두 번 연속 입력 시 공을 낙하시키고, 세 번 연속 입력 시 공을 원래 위치로 리셋하는 로직을 구현하였습니다.
- 스페이스바 버튼과 키보드 스페이스바 입력
  - 두 입력 방식을 동일하게 취급하도록 결정하였습니다.
  - 그래서 온스크린에 있는 스페이스바 버튼을 클릭하는 것과 키보드의 스페이스바를 누르는 것을 동일하게 처리하여, 두 번 연속 입력 시 낙하, 세 번 연속 입력 시 리셋이 동일하게 적용되도록 하였습니다.
- 대상자가 초등학생이라는 점
  - 외부 요인(예: 공기저항 등)은 고려하지 않고, 오직 중력만 적용한 이상적인 자유 낙하를 시뮬레이션하였습니다.
  - 진공 상태처럼 외부의 방해 요소가 없는 조건에서는 모든 물체가 동일한 중력 가속도(약 9.8 m/s²)를 받아 낙하하게 됩니다.
  - 이를 통해 물체의 질량에 관계없이 낙하 속도가 동일하다는 원리를 초등학생들도 쉽게 이해할 수 있도록 했습니다.

