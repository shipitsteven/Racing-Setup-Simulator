export function getParameterFeedback(parameter: string, value: number): string {
  switch (parameter) {
    case 'camberFront':
      if (value < -3.5) {
        return "Aggressive negative camber - maximum cornering grip but poor straight-line braking and high tire wear";
      } else if (value < -2.5) {
        return "High negative camber - excellent cornering grip, reduced straight-line performance";
      } else if (value < -1.5) {
        return "Moderate negative camber - balanced cornering and straight-line performance";
      } else if (value < 0) {
        return "Low negative camber - prioritizes straight-line speed over cornering grip";
      } else {
        return "Positive camber - poor cornering grip, mainly used for oval racing";
      }

    case 'camberRear':
      if (value < -3.0) {
        return "Very aggressive rear camber - maximum traction under acceleration and cornering";
      } else if (value < -2.0) {
        return "High rear camber - improved acceleration traction and cornering stability";
      } else if (value < -1.0) {
        return "Moderate rear camber - balanced traction and tire wear";
      } else if (value < 0) {
        return "Low rear camber - even tire wear, less aggressive setup";
      } else {
        return "Positive rear camber - reduces traction, generally not recommended";
      }

    case 'toeFront':
      if (value > 0.2) {
        return "Heavy toe-in - very stable but sluggish turn-in and high tire wear";
      } else if (value > 0.05) {
        return "Moderate toe-in - stable handling, slightly slower steering response";
      } else if (value > -0.05) {
        return "Neutral toe - balanced stability and responsiveness";
      } else if (value > -0.2) {
        return "Toe-out - sharp turn-in response but less stable at high speed";
      } else {
        return "Excessive toe-out - very twitchy handling and high tire wear";
      }

    case 'toeRear':
      if (value > 0.1) {
        return "Rear toe-in - stable but may cause understeer and tire wear";
      } else if (value > -0.05) {
        return "Slight rear toe-in - good stability for most conditions";
      } else if (value > -0.15) {
        return "Rear toe-out - improves turn-in but reduces straight-line stability";
      } else {
        return "Excessive rear toe-out - very unstable, difficult to control";
      }

    case 'caster':
      if (value < 4) {
        return "Low caster - light steering but poor straight-line stability";
      } else if (value < 6) {
        return "Moderate caster - balanced steering feel and stability";
      } else if (value < 7.5) {
        return "High caster - heavy steering but excellent stability and camber gain";
      } else {
        return "Very high caster - very heavy steering, maximum stability";
      }

    case 'springRateFront':
      if (value < 100) {
        return "Soft front springs - comfortable over bumps but more body roll";
      } else if (value < 140) {
        return "Medium front springs - balanced comfort and handling";
      } else if (value < 180) {
        return "Stiff front springs - precise handling but harsh over bumps";
      } else {
        return "Very stiff front springs - racing setup, maximum precision";
      }

    case 'springRateRear':
      if (value < 110) {
        return "Soft rear springs - good traction but more squat under acceleration";
      } else if (value < 150) {
        return "Medium rear springs - balanced traction and stability";
      } else if (value < 190) {
        return "Stiff rear springs - better acceleration control, harsher ride";
      } else {
        return "Very stiff rear springs - maximum control but poor bump compliance";
      }

    case 'bumpDampingFront':
      if (value < 15) {
        return "Soft front bump damping - better over bumps but less body control";
      } else if (value < 25) {
        return "Medium front bump damping - balanced bump compliance and control";
      } else if (value < 35) {
        return "Stiff front bump damping - better body control but harsh over bumps";
      } else {
        return "Very stiff front bump damping - maximum control, very harsh ride";
      }

    case 'bumpDampingRear':
      if (value < 15) {
        return "Soft rear bump damping - good traction over bumps but less stability";
      } else if (value < 25) {
        return "Medium rear bump damping - balanced traction and stability";
      } else if (value < 35) {
        return "Stiff rear bump damping - better stability but reduced traction over bumps";
      } else {
        return "Very stiff rear bump damping - maximum stability, poor bump traction";
      }

    case 'reboundDampingFront':
      if (value < 15) {
        return "Soft front rebound - wheel returns quickly, may cause oscillation";
      } else if (value < 25) {
        return "Medium front rebound - balanced wheel control and compliance";
      } else if (value < 32) {
        return "Stiff front rebound - controlled wheel movement, firmer feel";
      } else {
        return "Very stiff front rebound - tight wheel control but poor bump absorption";
      }

    case 'reboundDampingRear':
      if (value < 15) {
        return "Soft rear rebound - good traction but may cause rear instability";
      } else if (value < 25) {
        return "Medium rear rebound - balanced traction and stability";
      } else if (value < 32) {
        return "Stiff rear rebound - better stability but reduced traction";
      } else {
        return "Very stiff rear rebound - maximum stability, poor traction recovery";
      }

    case 'antiRollBarFront':
      if (value < 18) {
        return "Soft front anti-roll bar - more front grip but increased body roll";
      } else if (value < 28) {
        return "Medium front anti-roll bar - balanced grip and roll control";
      } else if (value < 35) {
        return "Stiff front anti-roll bar - reduced front grip but better control";
      } else {
        return "Very stiff front anti-roll bar - minimal front grip, maximum control";
      }

    case 'antiRollBarRear':
      if (value < 20) {
        return "Soft rear anti-roll bar - more rear grip but potential oversteer";
      } else if (value < 30) {
        return "Medium rear anti-roll bar - balanced rear grip and stability";
      } else if (value < 38) {
        return "Stiff rear anti-roll bar - less rear grip but more understeer";
      } else {
        return "Very stiff rear anti-roll bar - minimal rear grip, very stable";
      }

    case 'rideHeightFront':
      if (value < 70) {
        return "Very low front - maximum downforce but risk of bottoming out";
      } else if (value < 78) {
        return "Low front ride height - good aerodynamics and handling";
      } else if (value < 85) {
        return "Medium front ride height - balanced performance and practicality";
      } else {
        return "High front ride height - less aerodynamic but better clearance";
      }

    case 'rideHeightRear':
      if (value < 75) {
        return "Very low rear - maximum downforce but risk of bottoming out";
      } else if (value < 82) {
        return "Low rear ride height - good aerodynamics and stability";
      } else if (value < 88) {
        return "Medium rear ride height - balanced performance and practicality";
      } else {
        return "High rear ride height - less efficient aerodynamically";
      }

    case 'pressureFrontLeft':
    case 'pressureFrontRight':
      if (value < 22) {
        return "Low pressure - maximum contact patch and grip but higher rolling resistance";
      } else if (value < 26) {
        return "Moderate pressure - balanced grip and efficiency for most conditions";
      } else if (value < 30) {
        return "High pressure - reduced grip but lower rolling resistance and tire wear";
      } else {
        return "Very high pressure - minimal grip, mainly for straight-line efficiency";
      }

    case 'pressureRearLeft':
    case 'pressureRearRight':
      if (value < 20) {
        return "Low rear pressure - maximum traction but increased wear and rolling resistance";
      } else if (value < 24) {
        return "Moderate rear pressure - good balance of traction and efficiency";
      } else if (value < 28) {
        return "High rear pressure - reduced traction but better fuel economy";
      } else {
        return "Very high rear pressure - poor traction, risk of wheelspin";
      }

    case 'temperatureFrontLeft':
    case 'temperatureFrontRight':
      if (value < 75) {
        return "Cold front tires - reduced grip and slower warm-up, poor performance";
      } else if (value < 85) {
        return "Cool front tires - below optimal temperature, gradually building grip";
      } else if (value < 95) {
        return "Optimal front tire temperature - maximum grip and responsiveness";
      } else if (value < 105) {
        return "Hot front tires - starting to lose peak grip, increased wear rate";
      } else {
        return "Overheated front tires - significant grip loss and rapid degradation";
      }

    case 'temperatureRearLeft':
    case 'temperatureRearRight':
      if (value < 75) {
        return "Cold rear tires - poor traction, risk of wheelspin and instability";
      } else if (value < 85) {
        return "Cool rear tires - building traction, still below optimal performance";
      } else if (value < 95) {
        return "Optimal rear tire temperature - maximum traction and stability";
      } else if (value < 105) {
        return "Hot rear tires - losing peak traction, increased degradation";
      } else {
        return "Overheated rear tires - severe traction loss and rapid wear";
      }

    case 'frontWing':
      if (value < 10) {
        return "Low front wing - minimal front downforce, better straight-line speed but poor turn-in";
      } else if (value < 25) {
        return "Moderate front wing - balanced front downforce and drag for most conditions";
      } else if (value < 40) {
        return "High front wing - strong front downforce, excellent turn-in but increased drag";
      } else {
        return "Maximum front wing - extreme front downforce, very sharp turn-in but poor top speed";
      }

    case 'rearWing':
      if (value < 10) {
        return "Low rear wing - minimal rear downforce, better acceleration but less stability";
      } else if (value < 30) {
        return "Moderate rear wing - balanced rear downforce and straight-line performance";
      } else if (value < 45) {
        return "High rear wing - strong rear downforce, excellent stability but reduced top speed";
      } else {
        return "Maximum rear wing - extreme rear downforce, maximum stability but poor acceleration";
      }

    case 'splitter':
      if (value < 5) {
        return "Minimal splitter - clean airflow but limited front downforce generation";
      } else if (value < 15) {
        return "Moderate splitter - balanced front downforce without excessive drag penalty";
      } else if (value < 25) {
        return "Large splitter - significant front downforce but increased drag and fragility";
      } else {
        return "Maximum splitter - extreme front downforce but very high drag and damage risk";
      }

    case 'diffuser':
      if (value < 10) {
        return "Small diffuser - limited underbody enhancement but clean rear airflow";
      } else if (value < 20) {
        return "Moderate diffuser - good balance of rear downforce and drag efficiency";
      } else if (value < 30) {
        return "Large diffuser - strong rear downforce with relatively low drag penalty";
      } else {
        return "Maximum diffuser - extreme rear downforce extraction from underbody airflow";
      }

    case 'rakeAngle':
      if (value < -1.0) {
        return "Negative rake - nose down setup, reduces underbody efficiency but aids turn-in";
      } else if (value < 0.5) {
        return "Low rake - slight nose up, balanced aerodynamic platform for most tracks";
      } else if (value < 1.5) {
        return "Moderate rake - good underbody airflow and rear downforce generation";
      } else {
        return "High rake - maximum underbody efficiency but may compromise front balance";
      }

    case 'brakeBias':
      if (value < 50) {
        return "Rear-biased braking - shorter distances but risk of instability and lockup";
      } else if (value < 55) {
        return "Balanced brake bias - good compromise between performance and stability";
      } else if (value < 62) {
        return "Moderate front bias - stable braking with reasonable stopping distances";
      } else {
        return "Heavy front bias - very stable but longer braking distances";
      }

    case 'brakePressure':
      if (value < 85) {
        return "Low brake pressure - light pedal feel but may lack ultimate stopping power";
      } else if (value < 95) {
        return "Moderate pressure - balanced pedal feel and braking performance";
      } else if (value < 110) {
        return "High pressure - strong braking power but heavier pedal feel";
      } else {
        return "Maximum pressure - ultimate stopping power but very heavy pedal";
      }

    case 'brakeTemperatureFront':
      if (value < 350) {
        return "Cold front brakes - poor initial bite, need warming up for performance";
      } else if (value < 400) {
        return "Cool front brakes - approaching optimal temperature, building performance";
      } else if (value < 500) {
        return "Optimal front brake temperature - maximum friction and consistent performance";
      } else if (value < 550) {
        return "Hot front brakes - starting to fade, increased wear and reduced performance";
      } else {
        return "Overheated front brakes - severe fade, poor performance, rapid degradation";
      }

    case 'brakeTemperatureRear':
      if (value < 330) {
        return "Cold rear brakes - poor bite, potential for rear instability under braking";
      } else if (value < 380) {
        return "Cool rear brakes - building temperature, gradually improving performance";
      } else if (value < 480) {
        return "Optimal rear brake temperature - excellent bite and stability";
      } else if (value < 530) {
        return "Hot rear brakes - beginning to fade, watch for reduced effectiveness";
      } else {
        return "Overheated rear brakes - significant fade, instability risk, rapid wear";
      }

    case 'brakeDuctSizeFront':
      if (value === 0) {
        return "No front brake cooling - maximum temperature buildup, risk of fade";
      } else if (value < 3) {
        return "Minimal front cooling - some temperature control but still runs hot";
      } else if (value < 5) {
        return "Moderate front cooling - good temperature management with acceptable drag";
      } else {
        return "Maximum front cooling - excellent temperature control but increased drag";
      }

    case 'brakeDuctSizeRear':
      if (value === 0) {
        return "No rear brake cooling - high temperatures, potential for rear instability";
      } else if (value < 2) {
        return "Minimal rear cooling - basic temperature management, monitor closely";
      } else if (value < 4) {
        return "Moderate rear cooling - balanced temperature control and aerodynamics";
      } else {
        return "Maximum rear cooling - optimal temperature management with drag penalty";
      }

    case 'gear1':
      if (value < 3.2) {
        return "Short 1st gear - limited acceleration punch but better for tight corners";
      } else if (value < 3.8) {
        return "Moderate 1st gear - balanced acceleration and corner exit performance";
      } else {
        return "Tall 1st gear - maximum acceleration from standstill but may bog in tight corners";
      }

    case 'gear2':
      if (value < 2.6) {
        return "Short 2nd gear - quick shifts but may hit limiter early in corners";
      } else if (value < 3.0) {
        return "Moderate 2nd gear - good balance for most corner exit situations";
      } else {
        return "Tall 2nd gear - strong pull but larger gap from 1st gear";
      }

    case 'gear3':
    case 'gear4':
    case 'gear5':
      if (value < (value < 2.0 ? 1.6 : 1.8)) {
        return "Short ratio - quick acceleration between gears but may limit top speed";
      } else if (value < (value < 2.0 ? 1.8 : 2.2)) {
        return "Moderate ratio - balanced acceleration and top speed for this gear";
      } else {
        return "Tall ratio - emphasizes top speed over acceleration";
      }

    case 'gear6':
    case 'gear7':
      if (value < 1.0) {
        return "Very tall gear - maximum top speed but poor acceleration in this gear";
      } else if (value < 1.2) {
        return "Tall gear - good top speed with reasonable acceleration";
      } else {
        return "Shorter gear - better acceleration but limited top speed potential";
      }

    case 'finalDrive':
      if (value < 3.2) {
        return "Low final drive - maximum top speed but sluggish acceleration";
      } else if (value < 3.8) {
        return "Moderate final drive - balanced acceleration and top speed";
      } else if (value < 4.4) {
        return "High final drive - strong acceleration but reduced top speed";
      } else {
        return "Very high final drive - maximum acceleration but poor top speed";
      }

    case 'differentialOnThrottle':
      if (value < 30) {
        return "Low on-throttle lock - allows wheel spin for rotation but less traction";
      } else if (value < 60) {
        return "Moderate on-throttle lock - balanced traction and cornering ability";
      } else if (value < 80) {
        return "High on-throttle lock - maximum traction but may push wide";
      } else {
        return "Very high on-throttle lock - maximum traction but poor rotation";
      }

    case 'differentialOffThrottle':
      if (value < 20) {
        return "Low off-throttle lock - free rotation but may be unstable under braking";
      } else if (value < 40) {
        return "Moderate off-throttle lock - good stability with reasonable rotation";
      } else {
        return "High off-throttle lock - maximum stability but reduced turn-in";
      }

    case 'differentialCoast':
      if (value < 15) {
        return "Low coast lock - free rotation in neutral throttle but less predictable";
      } else if (value < 25) {
        return "Moderate coast lock - balanced mid-corner behavior";
      } else {
        return "High coast lock - stable and predictable but may understeer";
      }

    case 'weight':
      if (value === 0) {
        return "No ballast - running at minimum weight for maximum performance";
      } else if (value < 25) {
        return "Light ballast - minimal impact on performance, used for fine balance adjustments";
      } else if (value < 50) {
        return "Moderate ballast - noticeable impact on acceleration and braking performance";
      } else if (value < 75) {
        return "Heavy ballast - significant performance impact but allows major balance changes";
      } else {
        return "Maximum ballast - major performance penalty but maximum setup flexibility";
      }

    default:
      return "Adjust this parameter to change vehicle behavior";
  }
}