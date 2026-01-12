# 프로세스 플로우 다이어그램

전체 시스템 프로세스를 Mermaid 다이어그램으로 정리한 문서입니다.

## 주요 기술 스택

- **Cold 데이터 저장소**: Apache Iceberg 테이블 형식으로 S3에 저장
- **쿼리 엔진**: Amazon Athena를 사용하여 Iceberg 테이블 SQL 쿼리
- **장점**: ACID 트랜잭션, 스키마 진화, 파티션 진화, 시간 여행 쿼리, 파티션 프루닝으로 쿼리 비용 절감

---

## 1. 전체 로드맵 프로세스 (6단계)

```mermaid
gantt
    title 전체 구현 로드맵 (2026년 3월부터 6개월)
    dateFormat YYYY-MM
    section 1단계
    데이터 통합 및 표준화    :active, step1, 2026-03, 2M
    section 2단계
    지능형 모니터링 시스템    :active, step2, after step1, 1M
    section 3단계
    원격 제어 및 OTA        :active, step3, after step2, 1M
    section 4단계
    자동 진단 및 대응       :active, step4, after step3, 1M
    section 5단계
    맞춤 서비스 및 예측 분석 :active, step5, after step4, 1M
    section 6단계
    지속적 개선 및 확장     :crit, step6, after step5, 1M
```

---

## 2. 데이터 통합 플랫폼 프로세스

```mermaid
flowchart TD
    subgraph 기존시스템["기존 시스템 (온프레미스/하이브리드)"]
        LegacyRDBMS[기존 RDBMS<br/>온프레미스]
        LegacyNoSQL[기존 NoSQL<br/>온프레미스]
        LegacyAPI[기존 API 서버<br/>온프레미스]
        LegacySensor[기존 센서 시스템<br/>온프레미스]
    end
    
    subgraph VPN터널링["VPN 터널링 계층 (내부망 통신)"]
        VPNGateway[AWS VPN Gateway<br/>Site-to-Site VPN<br/>IPSec 터널]
        VPCNetwork[VPC 내부 네트워크<br/>Private Subnet<br/>보안 그룹]
    end
    
    subgraph 원데이터소스["원데이터 소스 (측정/이벤트 데이터)"]
        Source1[IoT Devices<br/>TCP/MQTT/API]
        Source2[센서/측정 시스템<br/>TCP/MQTT]
        Source3[이벤트 로그<br/>API/REST]
    end
    
    subgraph 기초정보소스["기초 정보 소스 (마스터 데이터)"]
        Master1[RDBMS<br/>업체/고객/사용자 정보]
        Master2[NoSQL<br/>사이트/장비 설정]
    end
    
    subgraph 인프라게이트웨이["인프라 게이트웨이 계층 (AWS)"]
        TCPGateway[ECS 게이트웨이<br/>TCP 연결 수신]
        APIGateway[API Gateway<br/>또는<br/>ECS 서비스]
        MQTTGateway[IoT Core<br/>MQTT 브로커]
    end
    
    LegacyRDBMS -->|VPN 터널링<br/>내부망| VPNGateway
    LegacyNoSQL -->|VPN 터널링<br/>내부망| VPNGateway
    LegacyAPI -->|VPN 터널링<br/>내부망| VPNGateway
    LegacySensor -->|VPN 터널링<br/>내부망| VPNGateway
    
    VPNGateway -->|사설 IP 통신| VPCNetwork
    VPCNetwork --> TCPGateway
    VPCNetwork --> APIGateway
    VPCNetwork --> Master1
    VPCNetwork --> Master2
    
    subgraph 프로토콜어댑터["프로토콜 어댑터 계층"]
        TCPAdapter[TCP 어댑터<br/>ECS 서비스<br/>Kinesis Producer]
        MQTTAdapter[MQTT 어댑터<br/>IoT Core Rule<br/>Kinesis 연동]
        APIAdapter[API 어댑터<br/>API Gateway + Lambda<br/>또는<br/>ECS 서비스<br/>Kinesis Producer]
    end
    
    subgraph 데이터형식["데이터 형식 (센서 데이터)"]
        HexBinary[헥사 바이너리<br/>Hex Binary]
        JSONFormat[JSON 형식]
        CSVFormat[CSV 형식]
    end
    
    Source1 --> TCPGateway
    Source1 --> MQTTGateway
    Source1 --> APIGateway
    Source2 --> TCPGateway
    Source2 --> MQTTGateway
    Source3 --> APIGateway
    
    TCPGateway --> TCPAdapter
    APIGateway --> APIAdapter
    MQTTGateway --> MQTTAdapter
    
    TCPAdapter --> HexBinary
    TCPAdapter --> JSONFormat
    TCPAdapter --> CSVFormat
    MQTTAdapter --> HexBinary
    MQTTAdapter --> JSONFormat
    APIAdapter --> JSONFormat
    
    HexBinary --> Collect[Kinesis Data Streams<br/>통합 스트림<br/>원시 형식 보존]
    JSONFormat --> Collect
    CSVFormat --> Collect
    
    TCPAdapter -->|Kinesis Producer SDK| Collect
    MQTTAdapter -->|IoT Core Rule| Collect
    APIAdapter -->|Kinesis Producer SDK| Collect
    
    Collect --> Firehose[Kinesis Data Firehose<br/>원시 데이터 저장]
    Firehose --> Raw[(S3 Raw Layer<br/>원시 페이로드 보존)]
    
    Collect --> ConvertLambda[컨버트 모듈<br/>Lambda Function<br/>Kinesis Trigger<br/>YAML 기반 변환]
    
    subgraph YAML관리["YAML 설정 관리"]
        YAMLRepo[(YAML 저장소<br/>Git/S3<br/>버전 관리)]
        YAMLDeploy[Lambda 패키지<br/>YAML 포함]
        DLQ[(SQS DLQ<br/>데이터 누락 방지)]
    end
    
    YAMLRepo -->|CI/CD 파이프라인| YAMLDeploy
    YAMLDeploy -.->|배포 시 포함| ConvertLambda
    
    ConvertLambda --> ConvertSuccess{변환<br/>성공?}
    ConvertSuccess -->|성공| StandardJSON[표준 JSON 형식<br/>통합 스키마]
    ConvertSuccess -->|실패| DLQ
    
    DLQ --> DLQProcess[DLQ 처리<br/>재처리/분석]
    
    StandardJSON --> Classify[데이터 분류<br/>제품별/고객별/디바이스별]
    
    Master1 --> RDS[(RDS PostgreSQL<br/>기초 정보 데이터)]
    Master2 --> RDS
    
    Classify --> Common[공통 요소<br/>통신 에러/품질]
    Classify --> Product[제품별 데이터]
    Classify --> Customer[고객별 데이터]
    Classify --> Device[디바이스별 데이터]
    
    Common --> Periodic[주기 집계<br/>시간 단위]
    Periodic --> CommonDB[(RDS<br/>통신 통계)]
    
    Product --> Validate[스키마 검증<br/>Data Contract]
    Customer --> Validate
    Device --> Validate
    
    Validate -->|검증 실패| Error[오류 알림]
    Validate -->|검증 성공| Transform[표준화 변환<br/>Lambda<br/>페이로드 변환]
    
    Transform --> Join[기초 정보 조인<br/>RDS 참조]
    RDS -.->|조회| Join
    
    Join --> Standardized[(S3 Standardized Layer<br/>표준화 + 보강된 데이터)]
    
    Standardized --> Enrich[데이터 보강<br/>비즈니스 룰]
    Enrich --> Curated[(S3 Curated Layer<br/>가공된 데이터)]
    
    Curated --> Hot[Hot Layer<br/>DynamoDB/OpenSearch<br/>실시간 접근]
    Curated --> Warm[RDS PostgreSQL<br/>기초 정보 + 집계 결과]
    Curated --> Cold[Cold Layer<br/>Apache Iceberg<br/>on S3 + Athena<br/>원데이터 장기 보관]
    
    Hot --> Consumer1[실시간 대시보드]
    Warm --> Consumer2[분석 리포트<br/>기초 정보 조회]
    Cold --> Consumer3[히스토리 분석<br/>Athena SQL 쿼리<br/>RDS와 조인 가능]
    RDS -.->|참조| Consumer3
    
    style Raw fill:#e1f5ff
    style Standardized fill:#fff4e1
    style Curated fill:#e8f5e9
    style Hot fill:#ffebee
    style Warm fill:#f3e5f5
    style Cold fill:#e0f2f1
    style RDS fill:#fff9c4
    style ConvertLambda fill:#9C27B0,color:#fff
    style YAMLRepo fill:#607D8B,color:#fff
    style YAMLDeploy fill:#795548,color:#fff
    style StandardJSON fill:#00BCD4,color:#fff
    style DLQ fill:#F44336,color:#fff
```

---

## 2-1. 실시간 데이터 수집 및 다중 프로토콜 통합 프로세스

```mermaid
flowchart TD
    subgraph 기존시스템["기존 시스템 (온프레미스/하이브리드)"]
        LegacySystem[기존 시스템<br/>RDBMS/NoSQL/API/센서]
    end
    
    subgraph VPN터널링["VPN 터널링 계층 (내부망 통신)"]
        VPNGateway[AWS VPN Gateway<br/>Site-to-Site VPN<br/>IPSec 터널]
        VPCNetwork[VPC 내부 네트워크<br/>Private Subnet<br/>보안 그룹]
    end
    
    subgraph 다중프로토콜["다중 프로토콜 수집 계층 (실시간)"]
        TCP[TCP 연결<br/>바이너리/텍스트 프로토콜]
        MQTT[MQTT 브로커<br/>Pub/Sub 메시징]
        API[REST API<br/>JSON/XML 페이로드]
    end
    
    subgraph 인프라게이트웨이["인프라 게이트웨이 계층 (AWS)"]
        TCPGateway[ECS 게이트웨이<br/>TCP 연결 수신<br/>Container Service]
        APIGateway[API Gateway<br/>REST API 엔드포인트<br/>또는<br/>ECS 서비스]
        MQTTGateway[IoT Core<br/>MQTT 브로커]
    end
    
    LegacySystem -->|VPN 터널링<br/>내부망 통신| VPNGateway
    VPNGateway -->|사설 IP 통신| VPCNetwork
    VPCNetwork --> TCPGateway
    VPCNetwork --> APIGateway
    
    subgraph 프로토콜어댑터["프로토콜 어댑터 계층"]
        TCPAdapter[TCP 어댑터<br/>ECS 서비스<br/>Kinesis Producer]
        MQTTAdapter[MQTT 어댑터<br/>IoT Core Rule<br/>Kinesis 연동]
        APIAdapter[API 어댑터<br/>API Gateway + Lambda<br/>또는<br/>ECS 서비스<br/>Kinesis Producer]
    end
    
    subgraph 데이터형식["데이터 형식 (센서 데이터)"]
        HexBinary[헥사 바이너리<br/>Hex Binary]
        JSONFormat[JSON 형식]
        CSVFormat[CSV 형식]
    end
    
    TCP --> TCPGateway
    MQTT --> MQTTGateway
    API --> APIGateway
    
    TCPGateway --> TCPAdapter
    APIGateway --> APIAdapter
    MQTTGateway --> MQTTAdapter
    
    TCPAdapter --> HexBinary
    TCPAdapter --> JSONFormat
    TCPAdapter --> CSVFormat
    MQTTAdapter --> HexBinary
    MQTTAdapter --> JSONFormat
    APIAdapter --> JSONFormat
    
    subgraph 통합스트림["통합 스트림 계층"]
        KinesisStream[Kinesis Data Streams<br/>통합 데이터 스트림<br/>원시 형식 보존]
    end
    
    TCPAdapter -->|Kinesis Producer SDK<br/>헥사/JSON/CSV| KinesisStream
    MQTTAdapter -->|IoT Core Rule<br/>헥사/JSON| KinesisStream
    APIAdapter -->|Kinesis Producer SDK<br/>JSON| KinesisStream
    
    subgraph 컨버트모듈["컨버트 모듈 (Kinesis 뒤)"]
        ConvertLambda[Lambda Function<br/>컨버트 모듈<br/>YAML 기반 변환]
        
        ConvertLambda --> ConvertSuccess{변환<br/>성공?}
        ConvertSuccess -->|성공| StandardJSON[표준 JSON 형식<br/>통합 스키마]
        ConvertSuccess -->|실패| DLQ[(SQS DLQ<br/>Dead Letter Queue<br/>데이터 누락 방지)]
        
        DLQ --> DLQProcess[DLQ 처리<br/>Lambda/ECS<br/>재처리/분석]
        DLQProcess --> Alert[오류 알림<br/>SNS]
        DLQProcess --> Retry[재시도<br/>또는<br/>수동 처리]
    end
    
    subgraph YAML관리["YAML 설정 관리"]
        YAMLRepo[(YAML 설정 저장소<br/>Git/S3<br/>버전 관리)]
        YAMLDeploy[Lambda 배포 패키지<br/>YAML 포함]
    end
    
    YAMLRepo -->|CI/CD 파이프라인| YAMLDeploy
    YAMLDeploy -.->|배포 시 포함| ConvertLambda
    
    KinesisStream -->|Kinesis Trigger| ConvertLambda
    
    StandardJSON --> Classify[데이터 분류<br/>Lambda Function]
    
    subgraph 데이터분류["데이터 분류 및 라우팅"]
        Classify --> Common[공통 요소 추출<br/>통신 에러/통신 품질]
        Classify --> Product[제품별 데이터]
        Classify --> Customer[고객별 데이터]
        Classify --> Device[디바이스별 데이터]
    end
    
    subgraph 공통요소처리["공통 요소 처리 (주기 데이터)"]
        Common --> Periodic[주기 집계<br/>Kinesis Analytics<br/>시간 단위 집계]
        Periodic --> CommonDB[(RDS<br/>통신 에러 통계<br/>통신 품질 지표)]
        Periodic --> CommonArchive[(S3<br/>주기 데이터 아카이브)]
    end
    
    subgraph 제품별관리["제품별 데이터 관리"]
        Product --> ProductStream[제품별 스트림<br/>Kinesis Stream Partition]
        ProductStream --> ProductRule[제품별 알람 룰셋<br/>룰 엔진 적용]
        ProductRule --> ProductDB[(DynamoDB<br/>제품별 데이터)]
        ProductRule --> ProductAlarm[제품별 알람 생성]
    end
    
    subgraph 고객별관리["고객별 데이터 관리"]
        Customer --> CustomerStream[고객별 스트림<br/>Kinesis Stream Partition]
        CustomerStream --> CustomerDB[(RDS<br/>고객별 데이터)]
        CustomerStream --> CustomerDashboard[고객별 대시보드]
    end
    
    subgraph 디바이스알람["디바이스별 알람 처리"]
        Device --> DeviceStream[디바이스별 스트림]
        DeviceStream --> DeviceRule[제품별 알람 룰셋<br/>룰 엔진 적용]
        DeviceRule --> AlarmEval{알람 조건<br/>평가}
        AlarmEval -->|조건 만족| DeviceAlarm[디바이스 알람 생성]
        AlarmEval -->|조건 불만족| Continue[계속 모니터링]
        DeviceAlarm --> AlarmDB[(DynamoDB<br/>알람 이력)]
        DeviceAlarm --> Notification[알림 발송<br/>SNS]
    end
    
    subgraph 원시데이터저장["원시 데이터 저장"]
        KinesisStream --> Firehose[Kinesis Data Firehose<br/>배치 저장]
        Firehose --> RawS3[(S3 Raw Layer<br/>원시 페이로드 보존)]
    end
    
    style KinesisStream fill:#4CAF50,color:#fff
    style Classify fill:#FF9800,color:#fff
    style ConvertLambda fill:#9C27B0,color:#fff
    style YAMLRepo fill:#607D8B,color:#fff
    style YAMLDeploy fill:#795548,color:#fff
    style StandardJSON fill:#00BCD4,color:#fff
    style DLQ fill:#F44336,color:#fff
    style CommonDB fill:#fff9c4
    style ProductRule fill:#ffebee
    style DeviceRule fill:#ffebee
    style AlarmDB fill:#e3f2fd
    style RawS3 fill:#e1f5ff
```

### 인프라 게이트웨이 및 프로토콜별 처리 특성

#### TCP 프로토콜
- **인프라 구성**: ECS 게이트웨이 (Container Service) 필요
- **특징**: 바이너리 또는 텍스트 기반 프로토콜, 지속 연결
- **데이터 형식**: 헥사 바이너리, JSON, CSV 등 다양한 형식 지원
- **처리 흐름**:
  1. TCP 연결 → ECS 게이트웨이 (TCP 포트 리스닝)
  2. ECS 게이트웨이 → ECS 서비스 (TCP 어댑터)
  3. ECS 서비스 → Kinesis Producer SDK → Kinesis Data Streams
  4. Kinesis → Lambda 컨버트 모듈 → YAML 로직 적용 → JSON 표준 형식
- **ECS 구성**: Fargate 또는 EC2 기반, 로드 밸런서(NLB) 연동, Auto Scaling

#### MQTT 프로토콜
- **인프라 구성**: AWS IoT Core (관리형 MQTT 브로커)
- **특징**: Pub/Sub 메시징, 토픽 기반 라우팅
- **데이터 형식**: 헥사 바이너리, JSON 등
- **처리 흐름**:
  1. MQTT 클라이언트 → AWS IoT Core (MQTT 브로커)
  2. IoT Core Rule → Kinesis Data Streams (직접 연동)
  3. Kinesis → Lambda 컨버트 모듈 → YAML 로직 적용 → JSON 표준 형식
- **IoT Core 기능**: Device Gateway, Rule Engine, 보안 인증

#### REST API 프로토콜
- **인프라 구성**: API Gateway 또는 ECS 서비스 필요
- **옵션 1 (API Gateway)**: 
  - API Gateway → Lambda → Kinesis Producer SDK → Kinesis Data Streams
  - 특징: 서버리스, 자동 스케일링, API 버전 관리
- **옵션 2 (ECS 서비스)**:
  - API Gateway 또는 ALB → ECS 서비스 → Kinesis Producer SDK → Kinesis Data Streams
  - 특징: 컨테이너 기반, 세밀한 제어, 높은 성능
- **데이터 형식**: 주로 JSON 형식
- **처리 흐름**:
  1. HTTP 요청 → API Gateway/ECS
  2. API Gateway/ECS → Lambda/ECS 서비스
  3. Lambda/ECS → Kinesis Producer SDK → Kinesis Data Streams
  4. Kinesis → Lambda 컨버트 모듈 → YAML 로직 적용 → 표준 JSON 형식

### 데이터 형식 변환 (YAML 기반 컨버트 모듈)

**위치**: Kinesis Data Streams 뒤 (Kinesis Trigger로 Lambda 실행)

**처리 순서**:
1. 프로토콜 어댑터 → 원시 데이터 형식 (헥사/JSON/CSV) → Kinesis Data Streams
2. Kinesis Data Streams → Lambda Trigger → 컨버트 모듈 (Lambda Function)
3. 컨버트 모듈 → YAML 규칙 적용 → 표준 JSON 형식
4. 변환 실패 시 → SQS DLQ → 재처리/분석

#### 지원 데이터 형식
1. **헥사 바이너리 (Hex Binary)**
   - 특징: 바이너리 데이터의 16진수 표현
   - 예시: `0x01A2B3C4D5E6F7`
   - 변환: YAML 규칙 기반 바이트 파싱 및 필드 추출
   - **파싱 방식**:
     - **길이 기반 파싱 (Length-based)**: 고정된 바이트 길이로 필드를 분리
       - 예: offset 0부터 2바이트 = 첫 번째 필드, offset 2부터 1바이트 = 두 번째 필드
     - **Key-Value 파싱**: 키-값 쌍 형태로 데이터가 구성된 경우
       - 예: `0x4B65794156616C` (KeyA=Val 형태의 구조)
     - **하이브리드 파싱 (Separator + Length)**: 특정 세퍼레이터(키값)를 기준으로 구간을 분리하고, 각 구간 내에서 길이 기반으로 여러 키값 파싱
       - 예: 세퍼레이터 `0xAA`를 기준으로 구간 분리 → 각 구간에서 길이 기반 파싱으로 여러 필드 추출

2. **JSON 형식**
   - 특징: 구조화된 데이터 형식
   - 예시: `{"temperature": 25.5, "humidity": 60}`
   - 변환: YAML 규칙 기반 필드 매핑 및 스키마 변환

3. **CSV 형식**
   - 특징: 쉼표로 구분된 텍스트 데이터
   - 예시: `timestamp,temperature,humidity\n2026-03-01 10:00:00,25.5,60`
   - 변환: YAML 규칙 기반 컬럼 매핑 및 타입 변환

#### YAML 컨버트 모듈 구조

**YAML 관리 방식**:
- **버전 관리 저장소**: Git 또는 S3에 YAML 설정 파일 저장 및 버전 관리 (별도 관리)
- **배포 방식**: Lambda 배포 시 YAML 파일을 Lambda 패키지(ZIP)에 포함하여 함께 배포
- **관리 프로세스**: 
  1. YAML 변경 시 Git/S3 저장소에 업데이트
  2. CI/CD 파이프라인에서 Lambda 패키지에 YAML 포함
  3. Lambda 재배포 (YAML 변경 시 전체 Lambda 재배포)
- **제품별 규칙**: 제품 타입별로 다른 변환 규칙 적용
- **디바이스별 규칙**: 디바이스 모델별 세부 변환 규칙
- **변환 실행**: Lambda 내 YAML 로직 엔진을 통한 자동 변환 수행

**DLQ (Dead Letter Queue) 처리**:
- **목적**: 데이터 누락 방지 및 오류 데이터 보존
- **구현**: Lambda 실패 시 SQS Dead Letter Queue로 자동 전송
- **Lambda DLQ 설정**: Lambda Function의 Dead Letter Queue 설정을 통해 자동 전송
- **처리**: DLQ Lambda/ECS를 통한 재처리, 오류 분석, 수동 처리
- **알림**: DLQ 메시지 발생 시 SNS를 통한 즉시 알림
- **데이터 보존**: DLQ에 저장된 데이터를 통한 재처리 및 분석 가능

#### YAML 변환 규칙 예시

**1. 길이 기반 파싱 (Length-based Parsing)**
```yaml
# 제품 A - 헥사 바이너리 변환 규칙 (길이 기반)
product_type: "product_a"
format: "hex_binary"
parsing_type: "length_based"
conversion:
  - field: "temperature"
    offset: 0
    length: 2
    type: "int16"
    scale: 0.1
    unit: "celsius"
  - field: "humidity"
    offset: 2
    length: 1
    type: "uint8"
    unit: "percent"
  output_schema:
    tenant: "${device.tenant}"
    device_id: "${device.id}"
    timestamp: "${ingest_time}"
    metrics: "${converted_fields}"
```

**2. Key-Value 파싱 (Key-Value Parsing)**
```yaml
# 제품 B - 헥사 바이너리 변환 규칙 (Key-Value 형태)
product_type: "product_b"
format: "hex_binary"
parsing_type: "key_value"
conversion:
  - key: "0x0001"  # 키 값 (2바이트)
    field: "temperature"
    value_length: 2
    type: "int16"
    scale: 0.1
    unit: "celsius"
  - key: "0x0002"  # 키 값 (2바이트)
    field: "humidity"
    value_length: 1
    type: "uint8"
    unit: "percent"
  output_schema:
    tenant: "${device.tenant}"
    device_id: "${device.id}"
    timestamp: "${ingest_time}"
    metrics: "${converted_fields}"
```

**3. 하이브리드 파싱 (Separator + Length-based Parsing)**
```yaml
# 제품 C - 헥사 바이너리 변환 규칙 (세퍼레이터 + 길이 기반)
product_type: "product_c"
format: "hex_binary"
parsing_type: "hybrid"
separator: "0xAA"  # 세퍼레이터 (1바이트)
sections:
  - section_id: 1
    conversion:
      - field: "temperature"
        offset: 0
        length: 2
        type: "int16"
        scale: 0.1
        unit: "celsius"
      - field: "humidity"
        offset: 2
        length: 1
        type: "uint8"
        unit: "percent"
  - section_id: 2
    conversion:
      - field: "pressure"
        offset: 0
        length: 4
        type: "int32"
        scale: 0.01
        unit: "hPa"
  output_schema:
    tenant: "${device.tenant}"
    device_id: "${device.id}"
    timestamp: "${ingest_time}"
    metrics: "${all_sections_merged}"
```

**파싱 방식별 특징**:
- **길이 기반 파싱**: 고정 길이 구조에 적합, 파싱 속도 빠름, 스키마 변경 시 YAML 업데이트 필요
- **Key-Value 파싱**: 유연한 구조, 순서 독립적, 키 검색 오버헤드 존재
- **하이브리드 파싱**: 복합 구조 처리 가능, 세퍼레이터로 구간 분리 후 각 구간별로 길이 기반 파싱, 복잡한 프로토콜 지원

**4. CSV 변환 규칙 예시**
```yaml
# 제품 D - CSV 변환 규칙
product_type: "product_d"
format: "csv"
conversion:
  delimiter: ","
  header: true
  mapping:
    - source: "temp"
      target: "temperature"
      type: "float"
      unit: "celsius"
    - source: "hum"
      target: "humidity"
      type: "float"
      unit: "percent"
  output_schema:
    tenant: "${device.tenant}"
    device_id: "${device.id}"
    timestamp: "${timestamp}"
    metrics: "${mapped_fields}"
```

### 데이터 분류 기준

#### 공통 요소 (주기 데이터)
- 통신 에러 통계: 연결 실패, 타임아웃, 패킷 손실 등
- 통신 품질 지표: 지연 시간, 처리량, 가용성 등
- 처리 방식: 시간 단위 집계 (1분, 5분, 1시간)
- 저장소: RDS (통계), S3 (아카이브)

#### 제품별 데이터 관리
- 제품 타입별로 Kinesis Stream 파티션 분리
- 제품별 알람 룰셋 정의 및 적용
- 제품별 데이터베이스 분리 또는 태깅

#### 고객별 데이터 관리
- 고객 ID 기반 Kinesis Stream 파티션 분리
- 고객별 데이터 격리 및 권한 관리
- 고객별 맞춤 대시보드 제공

#### 디바이스별 알람 처리
- 디바이스 ID 기반 스트림 라우팅
- 제품 타입에 따라 해당 제품의 알람 룰셋 적용
- 알람 이력 관리 및 알림 발송

---

## 2-2. 파일 데이터 배치 처리 프로세스 (별도 Job)

```mermaid
flowchart TD
    subgraph 파일수집["파일 수집 (별도 프로젝트)"]
        FTP[FTP/SFTP 서버]
        S3File[S3 버킷<br/>파일 업로드]
    end
    
    subgraph 배치스케줄링["배치 스케줄링"]
        Schedule[EventBridge<br/>스케줄러<br/>크론 표현식]
        Trigger[배치 Job 트리거]
    end
    
    subgraph 배치처리["배치 처리 Job"]
        BatchJob[Glue Job<br/>또는<br/>ECS Task<br/>또는<br/>Lambda]
        
        BatchJob --> FileRead[파일 읽기<br/>FTP/S3]
        FileRead --> FileParse[파일 파싱<br/>CSV/JSON/Excel]
        FileParse --> BatchConvert[배치 컨버트<br/>YAML 규칙 적용]
        BatchConvert --> BatchValidate[스키마 검증<br/>Data Contract]
        BatchValidate -->|검증 성공| BatchJSON[표준 JSON 형식]
        BatchValidate -->|검증 실패| BatchError[오류 파일<br/>S3 보관]
    end
    
    subgraph 배치저장["배치 데이터 저장"]
        BatchJSON --> BatchS3[(S3 Raw Layer<br/>배치 데이터)]
        BatchJSON --> BatchKinesis[Kinesis Data Firehose<br/>대용량 배치 전송]
        BatchKinesis --> BatchS3
    end
    
    subgraph 배치알림["배치 처리 결과"]
        BatchError --> BatchAlert[배치 오류 알림<br/>SNS]
        BatchJob --> BatchReport[배치 리포트<br/>처리 건수/오류 건수]
    end
    
    FTP --> S3File
    S3File --> Schedule
    Schedule -->|스케줄 실행| Trigger
    Trigger --> BatchJob
    
    BatchS3 --> Process[후속 처리<br/>Standardized/Curated]
    
    style Schedule fill:#FF9800,color:#fff
    style BatchJob fill:#9C27B0,color:#fff
    style BatchS3 fill:#e1f5ff
    style BatchError fill:#F44336,color:#fff
    style BatchAlert fill:#ffebee
```

### 파일 배치 처리 특징

- **별도 프로젝트**: 실시간 데이터 수집과 분리된 별도 배치 Job으로 처리
- **스케줄링**: EventBridge 크론 표현식을 통한 주기적 실행 (일/시간 단위)
- **처리 방식**: Glue Job, ECS Task, 또는 Lambda를 통한 대용량 파일 처리
- **데이터 저장**: S3 Raw Layer에 직접 저장 또는 Kinesis Data Firehose를 통한 전송
- **오류 처리**: 검증 실패 파일은 별도 S3 경로에 보관 및 알림 발송
- **YAML 규칙**: 배치 Job에도 동일한 YAML 변환 규칙 적용 가능

---

## 3. 지능형 모니터링 및 알람 프로세스 (제품별 룰셋 적용)

```mermaid
flowchart TD
    Data[실시간 데이터 스트림<br/>Kinesis Data Streams] --> Identify[디바이스/제품 식별<br/>메타데이터 추출]
    
    Identify --> ProductType{제품 타입<br/>확인}
    
    ProductType --> Product1[제품 A<br/>룰셋]
    ProductType --> Product2[제품 B<br/>룰셋]
    ProductType --> Product3[제품 C<br/>룰셋]
    ProductType --> ProductN[제품 N<br/>룰셋]
    
    Product1 --> Rules1{제품 A<br/>룰 엔진 타입}
    Product2 --> Rules2{제품 B<br/>룰 엔진 타입}
    Product3 --> Rules3{제품 C<br/>룰 엔진 타입}
    ProductN --> RulesN{제품 N<br/>룰 엔진 타입}
    
    Rules1 -->|임계값| Threshold1[Threshold Rule<br/>제품 A 전용 임계값]
    Rules1 -->|이상 패턴| Anomaly1[Anomaly Rule<br/>제품 A 패턴]
    Rules1 -->|조합 조건| Correlation1[Correlation Rule<br/>제품 A 조합]
    Rules1 -->|예측 모델| Predictive1[Predictive Rule<br/>제품 A 모델]
    
    Rules2 -->|임계값| Threshold2[Threshold Rule<br/>제품 B 전용 임계값]
    Rules2 -->|이상 패턴| Anomaly2[Anomaly Rule<br/>제품 B 패턴]
    Rules2 -->|조합 조건| Correlation2[Correlation Rule<br/>제품 B 조합]
    Rules2 -->|예측 모델| Predictive2[Predictive Rule<br/>제품 B 모델]
    
    Threshold1 --> Evaluate[조건 평가<br/>제품별 룰셋]
    Anomaly1 --> Evaluate
    Correlation1 --> Evaluate
    Predictive1 --> Evaluate
    
    Threshold2 --> Evaluate
    Anomaly2 --> Evaluate
    Correlation2 --> Evaluate
    Predictive2 --> Evaluate
    
    Evaluate -->|조건 불만족| Continue[계속 모니터링]
    Evaluate -->|조건 만족| Filter[AI False Positive<br/>필터링<br/>제품별 모델 적용]
    
    Filter -->|오탐| FilterOut[필터링됨]
    Filter -->|진짜 알람| CreateAlarm[알람 생성<br/>제품별 룰셋 기반]
    
    CreateAlarm --> RuleConfig{제품별<br/>알람 설정<br/>조회}
    RuleConfig --> RDSRules[(RDS<br/>제품별 룰셋<br/>설정)]
    RDSRules -.->|룰셋 로드| RuleConfig
    
    RuleConfig --> Priority{심각도 판단<br/>제품별 기준}
    
    Priority -->|Critical| AutoAction[자동 대응 시도<br/>제품별 액션]
    Priority -->|High| Notify[운영팀 알림<br/>SNS<br/>제품별 채널]
    Priority -->|Medium| Queue[대기열 추가<br/>제품별 큐]
    Priority -->|Low| Log[로그만 기록<br/>제품별 로그]
    
    AutoAction --> Result{자동 해결<br/>가능?}
    Result -->|성공| Resolved[해결 완료<br/>결과 기록<br/>제품별 이력]
    Result -->|실패| Escalate[에스컬레이션<br/>운영팀 전달<br/>제품별 담당자]
    
    Notify --> Ticket[티켓 생성<br/>제품별 태깅]
    Escalate --> Ticket
    Queue --> Ticket
    
    Ticket --> ManualAction[수동 대응<br/>제품별 가이드 참조]
    ManualAction --> Resolved
    
    Resolved --> Learn[모델 학습<br/>피드백 반영<br/>제품별 개선]
    Learn --> RuleUpdate[룰셋 업데이트<br/>제품별 최적화]
    RuleUpdate --> RDSRules
    Learn --> Continue
    
    style CreateAlarm fill:#ffebee
    style AutoAction fill:#e8f5e9
    style Resolved fill:#e3f2fd
    style Filter fill:#fff9c4
    style RDSRules fill:#fff9c4
    style RuleConfig fill:#f3e5f5
```

---

## 4. 원격 제어 프로세스 (Shadow 기반)

```mermaid
sequenceDiagram
    participant Server as 서버<br/>(관리 시스템)
    participant Shadow as AWS IoT<br/>Device Shadow
    participant Device as IoT 디바이스
    participant DB as 데이터베이스
    
    Server->>Shadow: desired 상태 업데이트<br/>$aws/things/{thingName}/shadow/update
    Note over Shadow: {desired: {fan_speed: 3, target_temp: 23}}
    
    Shadow->>Device: MQTT 메시지 전달<br/>(디바이스 온라인 시)
    Note over Device: 명령 수신 및 실행
    
    Device->>Shadow: reported 상태 업데이트<br/>{reported: {fan_speed: 3, ack: true}}
    
    Shadow->>Server: delta 이벤트 전달<br/>(상태 변경 알림)
    
    Server->>DB: 제어 명령 이력 저장<br/>control_cmd 테이블
    
    Server->>Shadow: 상태 확인<br/>shadow/get
    
    Shadow->>Server: 현재 상태 반환<br/>{desired, reported, delta}
    
    Server->>DB: 이벤트 기록<br/>event 테이블
    
    alt 디바이스 오프라인
        Note over Device: 디바이스 재연결 시<br/>desired 상태 자동 동기화
        Device->>Shadow: 상태 동기화
        Shadow->>Device: desired 상태 전달
    end
```

---

## 5. OTA (Over-The-Air) 업데이트 프로세스

```mermaid
stateDiagram-v2
    [*] --> Test: 펌웨어 업로드
    Test --> TestSuccess: 테스트 환경<br/>검증 완료
    Test --> TestFail: 테스트 실패
    TestFail --> [*]: 취소
    
    TestSuccess --> Canary: Canary 배포<br/>(5% 디바이스)
    
    Canary --> CanarySuccess: 성공률 > 95%
    Canary --> CanaryFail: 성공률 < 95%
    
    CanaryFail --> Rollback: 롤백
    Rollback --> [*]
    
    CanarySuccess --> Pilot: Pilot 배포<br/>(25% 디바이스)
    
    Pilot --> PilotSuccess: 성공률 > 98%
    Pilot --> PilotFail: 성공률 < 98%
    
    PilotFail --> Rollback
    
    PilotSuccess --> Production: Production 배포<br/>(100% 디바이스)
    
    Production --> Monitor: 배포 모니터링
    Monitor --> Complete: 전체 완료
    Monitor --> Rollback: 이상 발생
    
    Complete --> [*]
    Rollback --> [*]
    
    note right of Test
        Shadow 업데이트:
        {desired: {version: 2.0.1, 
         url: presignedURL,
         until: timestamp}}
    end note
    
    note right of Monitor
        디바이스 프로세스:
        1. 다운로드
        2. 검증 (체크섬)
        3. 설치
        4. 재부팅
        5. 상태 보고
    end note
```

---

## 6. 자동 진단 및 대응 프로세스 (폐쇄 루프)

```mermaid
flowchart TD
    Alarm[알람 발생] --> Collect[상태 데이터 수집<br/>디바이스/센서/로그]
    
    Collect --> Analysis{근본 원인 분석<br/>RCA Engine}
    
    Analysis -->|패턴 인식| PatternMatch[과거 유사 사례<br/>매칭]
    Analysis -->|새로운 패턴| AIModel[AI 모델 분석<br/>Bedrock/SageMaker]
    
    PatternMatch --> Solution{해결 방안<br/>도출}
    AIModel --> Solution
    
    Solution --> AutoFix{자동 해결<br/>가능?}
    
    AutoFix -->|가능| Execute[자동 조치 실행]
    AutoFix -->|불가능| Manual[수동 대응<br/>에스컬레이션]
    
    Execute --> Action1[Shadow 제어 명령]
    Execute --> Action2[설정 변경]
    Execute --> Action3[재시작 명령]
    Execute --> Action4[OTA 업데이트]
    
    Action1 --> Verify[결과 검증]
    Action2 --> Verify
    Action3 --> Verify
    Action4 --> Verify
    
    Verify --> Success{해결 성공?}
    
    Success -->|Yes| Record[성공 기록<br/>DB 저장]
    Success -->|No| Retry{재시도<br/>가능?}
    
    Retry -->|Yes| Execute
    Retry -->|No| Manual
    
    Record --> Learn[학습 데이터<br/>축적]
    Learn --> Update[모델 개선]
    Update --> Analysis
    
    Manual --> Resolved[해결 완료]
    Resolved --> Record
    
    style Execute fill:#e8f5e9
    style Verify fill:#fff9c4
    style Success fill:#e3f2fd
    style Manual fill:#ffebee
```

---

## 7. 통신 오류 배치 체크 프로세스

```mermaid
flowchart LR
    Schedule[EventBridge<br/>스케줄러] -->|매 정시| Trigger[Lambda 트리거]
    
    Trigger --> Query[최근 60분<br/>통신 데이터<br/>쿼리]
    
    Query --> Aggregate[집계 분석<br/>고객사/허브/디바이스별]
    
    Aggregate --> Check{미수신<br/>임계치<br/>초과?}
    
    Check -->|정상| End1[정상 종료]
    Check -->|이상| Grace{지연 허용<br/>그레이스 기간<br/>10분 고려}
    
    Grace -->|정상 복구| End1
    Grace -->|지속적 오류| Count{연속 미수신<br/>2회 이상?}
    
    Count -->|No| End2[모니터링 계속]
    Count -->|Yes| Alert[알람 생성<br/>High Severity]
    
    Alert --> Notify[고객사/운영팀<br/>알림 전송]
    Alert --> Ticket[티켓 생성]
    
    Notify --> Log[이벤트 로그<br/>기록]
    Ticket --> Log
    
    Log --> End3[프로세스 완료]
    
    style Alert fill:#ffebee
    style Notify fill:#fff9c4
    style Ticket fill:#e3f2fd
```

---

## 8. 전체 시스템 아키텍처 프로세스

```mermaid
graph TB
    subgraph "기존 시스템 (온프레미스)"
        LegacyRDBMS[기존 RDBMS]
        LegacyNoSQL[기존 NoSQL]
        LegacyAPI[기존 API 서버]
        LegacySensor[기존 센서 시스템]
    end
    
    subgraph "VPN 터널링 계층"
        VPNGateway[AWS VPN Gateway<br/>Site-to-Site VPN<br/>IPSec 터널]
        VPCNetwork[VPC 내부 네트워크<br/>Private Subnet]
    end
    
    subgraph "데이터 수집 계층"
        IoT[IoT Devices<br/>TCP/MQTT/API]
        Sensors[센서/측정 시스템<br/>TCP/MQTT]
        RDBMS[RDBMS<br/>기초 정보]
        NoSQL[NoSQL<br/>기초 정보]
    end
    
    subgraph "인프라 게이트웨이 계층 (AWS)"
        TCPGateway[ECS 게이트웨이<br/>TCP 연결 수신]
        APIGateway[API Gateway<br/>또는<br/>ECS 서비스]
        MQTTGateway[IoT Core<br/>MQTT 브로커]
    end
    
    LegacyRDBMS -->|VPN 터널링<br/>내부망| VPNGateway
    LegacyNoSQL -->|VPN 터널링<br/>내부망| VPNGateway
    LegacyAPI -->|VPN 터널링<br/>내부망| VPNGateway
    LegacySensor -->|VPN 터널링<br/>내부망| VPNGateway
    
    VPNGateway -->|사설 IP 통신| VPCNetwork
    VPCNetwork --> TCPGateway
    VPCNetwork --> APIGateway
    VPCNetwork --> RDBMS
    VPCNetwork --> NoSQL
    
    subgraph "프로토콜 어댑터 계층"
        TCPAdapter[TCP 어댑터<br/>ECS 서비스<br/>Kinesis Producer]
        MQTTAdapter[MQTT 어댑터<br/>IoT Core Rule<br/>Kinesis 연동]
        APIAdapter[API 어댑터<br/>API Gateway + Lambda<br/>또는<br/>ECS 서비스<br/>Kinesis Producer]
    end
    
    subgraph "데이터 플랫폼 계층"
        Kinesis[Kinesis Data Streams<br/>통합 스트림<br/>원시 형식]
        ConvertLambda[컨버트 모듈<br/>Lambda Function<br/>Kinesis Trigger<br/>YAML 기반 변환]
        DLQ[(SQS DLQ<br/>데이터 누락 방지)]
        Classify[데이터 분류<br/>Lambda]
        Lambda1[Lambda Functions<br/>추가 변환/보강]
        S3[S3 Data Lake<br/>Raw/Standardized/Curated]
        Periodic[주기 집계<br/>Kinesis Analytics]
    end
    
    subgraph "YAML 설정 관리"
        YAMLRepo[(YAML 저장소<br/>Git/S3<br/>버전 관리)]
        YAMLDeploy[Lambda 패키지<br/>YAML 포함]
    end
    
    subgraph "분석 엔진 계층"
        Rules[룰 엔진<br/>제품별 룰셋]
        ProductRules[제품별<br/>알람 룰셋<br/>관리]
        ML[SageMaker<br/>ML 모델<br/>제품별]
        Bedrock[Bedrock<br/>LLM 분석]
        Forecast[Forecast<br/>예측 분석]
    end
    
    subgraph "자동화 제어 계층"
        Shadow[IoT Device Shadow]
        OTA[OTA Service]
        EventBridge[EventBridge<br/>이벤트 오케스트레이션]
        Lambda2[Lambda Functions<br/>자동 대응]
    end
    
    subgraph "모니터링 및 알림"
        CloudWatch[CloudWatch<br/>모니터링]
        SNS[SNS<br/>알림]
        Dashboard[실시간 대시보드]
    end
    
    subgraph "데이터 저장소"
        DynamoDB[(DynamoDB<br/>Hot Data<br/>제품별/디바이스별)]
        CommonDB[(RDS<br/>통신 통계<br/>공통 요소)]
        RDS[(RDS PostgreSQL<br/>기초 정보 데이터<br/>+ 집계 결과<br/>+ 제품별 룰셋)]
        RDSRules[(RDS<br/>제품별<br/>알람 룰셋)]
        S3Archive[(S3 + Iceberg<br/>Cold Data<br/>원데이터)]
    end
    
    IoT --> TCPGateway
    IoT --> MQTTGateway
    IoT --> APIGateway
    Sensors --> TCPGateway
    Sensors --> MQTTGateway
    
    TCPGateway --> TCPAdapter
    APIGateway --> APIAdapter
    MQTTGateway --> MQTTAdapter
    
    TCPAdapter -->|Kinesis Producer SDK<br/>헥사/JSON/CSV<br/>원시 형식| Kinesis
    MQTTAdapter -->|IoT Core Rule<br/>헥사/JSON<br/>원시 형식| Kinesis
    APIAdapter -->|Kinesis Producer SDK<br/>JSON<br/>원시 형식| Kinesis
    
    Kinesis -->|Kinesis Trigger| ConvertLambda
    YAMLRepo -->|CI/CD 파이프라인| YAMLDeploy
    YAMLDeploy -.->|배포 시 포함| ConvertLambda
    
    ConvertLambda -->|성공| Classify
    ConvertLambda -->|실패| DLQ
    Classify --> Common[공통 요소<br/>통신 에러/품질]
    Classify --> Product[제품별 데이터]
    Classify --> Customer[고객별 데이터]
    Classify --> Device[디바이스별 데이터]
    
    Common --> Periodic
    Periodic --> CommonDB[(RDS<br/>통신 통계)]
    
    Product --> Lambda1
    Customer --> Lambda1
    Device --> Lambda1
    
    Lambda1 --> S3
    
    Kinesis --> Firehose[Kinesis Firehose]
    Firehose --> S3
    
    RDBMS --> RDS
    NoSQL --> RDS
    
    Product --> Rules
    Device --> Rules
    S3 --> ML
    S3 --> Bedrock
    S3 --> Forecast
    
    Rules --> ProductRules
    ProductRules -.->|룰셋 로드| RDSRules[(RDS<br/>제품별<br/>룰셋)]
    RDSRules -.->|룰셋 관리| ProductRules
    
    Rules --> EventBridge
    ML --> EventBridge
    Bedrock --> EventBridge
    Forecast --> EventBridge
    
    EventBridge --> Lambda2
    Lambda2 --> Shadow
    Lambda2 --> OTA
    
    Rules --> CloudWatch
    Lambda2 --> CloudWatch
    CloudWatch --> SNS
    SNS --> Dashboard
    
    Product --> DynamoDB
    S3 --> S3Archive
    
    Lambda1 --> Aggregate[집계 처리]
    Aggregate --> RDS
    
    Shadow --> IoT
    OTA --> IoT
    
    RDS -.->|기초 정보 참조| Lambda1
    RDS -.->|기초 정보 참조| Rules
    RDS -.->|기초 정보 조인| S3Archive
    RDS -.->|제품별 룰셋| Rules
    
    style S3 fill:#e1f5ff
    style Rules fill:#fff4e1
    style EventBridge fill:#e8f5e9
    style Shadow fill:#f3e5f5
```

---

## 9. 데이터 생명주기 관리 프로세스

```mermaid
flowchart TD
    subgraph 원데이터["원데이터 생명주기"]
        Ingest[원데이터 수집<br/>IoT/측정/이벤트] --> Raw[(Raw Layer<br/>S3 Standard<br/>원데이터)]
        
        Raw --> Process{처리 우선순위}
        
        Process -->|실시간 필요| HotProcess[실시간 처리<br/>Kinesis Analytics]
        Process -->|배치 처리| BatchProcess[배치 처리<br/>Glue ETL]
        
        HotProcess --> Standardized[(Standardized Layer<br/>S3 Standard)]
        BatchProcess --> Standardized
        
        Standardized --> Enrich[데이터 보강<br/>기초 정보 조인]
        MasterDB[(RDS<br/>기초 정보)] -.->|참조| Enrich
        
        Enrich --> Curated[(Curated Layer<br/>S3 Standard)]
        
        Curated --> Tier{접근 패턴<br/>분석}
        
        Tier -->|자주 접근<br/>1-7일| Hot[(Hot Layer<br/>DynamoDB<br/>실시간 원데이터)]
        Tier -->|거의 접근 안함<br/>90일 이상| Cold[(Cold Layer<br/>S3 + Iceberg<br/>원데이터 테이블)]
        
        Hot -->|90일 후| Archive1[아카이브]
        Archive1 --> Cold
        
        Cold -->|7년 후| Delete[데이터 삭제<br/>또는<br/>Iceberg 파티션 삭제]
        
        Hot --> Query1[실시간 조회<br/>대시보드]
        Cold --> Query3[히스토리 분석<br/>Athena SQL<br/>Iceberg 쿼리<br/>RDS와 조인]
    end
    
    subgraph 기초정보["기초 정보 관리"]
        MasterIngest[기초 정보 수집<br/>업체/고객/사용자/사이트/장비] --> MasterDB
        MasterDB --> Query2[기초 정보 조회<br/>분석 리포트<br/>대시보드]
        MasterDB -.->|상시 유지| Keep[상시 유지<br/>변경 이력 관리]
    end
    
    MasterDB -.->|참조| Query1
    MasterDB -.->|참조| Query3
    
    Aggregate[집계 처리] --> WarmAggregate[(RDS<br/>집계 결과<br/>3년 보관)]
    Curated --> Aggregate
    WarmAggregate --> Query2
    WarmAggregate -->|3년 후| Archive2[아카이브]
    Archive2 --> Cold
    
    style Hot fill:#ffebee
    style WarmAggregate fill:#fff9c4
    style MasterDB fill:#fff9c4
    style Cold fill:#e0f2f1
    style Delete fill:#e8eaf6
    style Raw fill:#e1f5ff
```

---

## 10. 고객별 맞춤 서비스 프로세스

```mermaid
flowchart TD
    Customer[고객사 정보] --> SLA[서비스 수준 협약<br/>SLA 정의]
    
    SLA --> Policy{모니터링 정책<br/>설정}
    
    Policy --> Threshold1[임계값 설정<br/>고객사별 차등]
    Policy --> Schedule1[점검 일정<br/>산업별 맞춤]
    Policy --> Alert1[알림 채널<br/>고객사 선호 방식]
    
    Threshold1 --> Monitor[모니터링 실행]
    Schedule1 --> Monitor
    Alert1 --> Monitor
    
    Monitor --> Analyze[데이터 분석]
    Analyze --> Compare{SLA 기준<br/>대비 평가}
    
    Compare -->|준수| Report1[정상 리포트<br/>고객사 전송]
    Compare -->|위반| Escalate1[위반 알림<br/>즉시 전송]
    
    Escalate1 --> Action[대응 조치]
    Action --> Track[조치 이력<br/>추적]
    
    Track --> Update[SLA 준수율<br/>업데이트]
    Update --> Dashboard[고객 대시보드<br/>실시간 표시]
    
    Report1 --> Archive[월간 리포트<br/>아카이브]
    Update --> Archive
    
    Archive --> Trend[트렌드 분석<br/>예측 모델]
    Trend --> Improve[서비스 개선<br/>제안]
    
    Improve --> Customer
    
    style SLA fill:#e3f2fd
    style Compare fill:#fff9c4
    style Escalate1 fill:#ffebee
    style Dashboard fill:#e8f5e9
```

---

## 주요 특징 요약

### 실시간 데이터 수집 및 통합
- **다중 프로토콜 지원**: TCP, MQTT, REST API 등 다양한 프로토콜 통합 (파일은 별도 배치 처리)
- **VPN 터널링 (기존 시스템 연동)**:
  - **목적**: 이전 시스템과 AWS 연동을 위한 보안 통신
  - **구성**: AWS VPN Gateway (Site-to-Site VPN, IPSec 터널)
  - **네트워크**: VPC 내부 네트워크 (Private Subnet)를 통한 내부망 통신
  - **보안**: 사설 IP 통신으로 퍼블릭 노출 없이 기존 시스템과 통신
  - **연동 대상**: 기존 RDBMS, NoSQL, API 서버, 센서 시스템 등
- **인프라 게이트웨이**:
  - **TCP**: ECS 게이트웨이 필요 (TCP 포트 리스닝을 위한 Container Service)
  - **MQTT**: AWS IoT Core (관리형 MQTT 브로커)
  - **REST API**: API Gateway 또는 ECS 서비스 필요
- **Kinesis 연동 방식**:
  - **TCP/API**: Kinesis Producer SDK를 통한 직접 전송 (ECS 서비스 또는 Lambda)
  - **MQTT**: IoT Core Rule Engine을 통한 자동 Kinesis 연동
- **다중 데이터 형식**: 헥사 바이너리, JSON, CSV 등 다양한 데이터 형식 지원
- **통합 스트림**: Kinesis Data Streams를 통한 모든 데이터의 단일 진입점 (원시 형식 보존)
- **컨버트 모듈 위치**: Kinesis Data Streams 뒤에서 Lambda Function으로 실행 (Kinesis Trigger)
- **YAML 기반 변환**: 제품별/디바이스별 변환 규칙을 YAML로 관리 (Lambda 패키지에 포함)
- **YAML 관리**: Git/S3에서 버전 관리, CI/CD 파이프라인을 통한 Lambda 재배포
- **DLQ 처리**: Lambda 실패 시 SQS DLQ로 전송하여 데이터 누락 방지 및 재처리
- **페이로드 변환**: YAML 로직을 통한 표준 JSON 형식 변환
- **원시 데이터 보존**: S3 Raw Layer에 원본 페이로드(헥사/CSV/JSON) 보존으로 재처리 가능

### 파일 데이터 배치 처리
- **별도 프로젝트**: 실시간 처리와 분리된 별도 배치 Job으로 처리
- **스케줄링**: EventBridge 크론 표현식을 통한 주기적 실행
- **처리 방식**: Glue Job, ECS Task, 또는 Lambda를 통한 대용량 파일 처리
- **YAML 규칙**: 배치 Job에도 동일한 YAML 변환 규칙 적용 가능

### 데이터 분류 및 관리
- **공통 요소 (주기 데이터)**: 통신 에러, 통신 품질 등 시간 단위 집계 처리 (Kinesis Analytics → RDS)
- **제품별 관리**: 제품 타입별 스트림 파티션 분리 및 제품별 알람 룰셋 적용 (RDS에서 동적 로드)
- **고객별 관리**: 고객 ID 기반 스트림 파티션 분리, 데이터 격리 및 맞춤 대시보드 제공
- **디바이스별 처리**: 디바이스별 스트림 라우팅 및 제품별 룰셋 기반 알람 처리 (DynamoDB + SNS)

### 제품별 알람 룰셋 시스템
- **제품 타입 식별**: 디바이스 메타데이터 기반 자동 제품 타입 식별
- **룰셋 관리**: RDS에 저장된 제품별 알람 룰셋 동적 로드
- **룰 엔진 적용**: 제품별로 다른 임계값, 패턴, 조합, 예측 모델 적용
- **자동화 대응**: 제품별 자동 대응 액션 및 알림 채널 관리
- **지속적 개선**: 제품별 피드백 기반 룰셋 최적화

## 사용 방법

이 문서의 Mermaid 다이어그램은 다음 도구에서 확인할 수 있습니다:

1. **GitHub/GitLab**: README나 마크다운 파일에서 자동 렌더링
2. **VS Code**: Mermaid Preview 확장 프로그램 설치
3. **온라인 에디터**: [Mermaid Live Editor](https://mermaid.live/)
4. **Notion, Confluence**: Mermaid 플러그인 사용

---

**최종 업데이트**: 2026년 3월
