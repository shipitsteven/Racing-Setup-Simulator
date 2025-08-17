export interface TrackCharacteristics {
  id: string;
  name: string;
  country: string;
  length: number; // in km
  corners: number;
  elevation: 'Low' | 'Medium' | 'High';
  downforceLevel: 'Low' | 'Medium' | 'High';
  trackType: 'Power' | 'Balanced' | 'Technical' | 'High-Speed';
  keyCharacteristics: string[];
  imageUrl?: string; // Local track layout image path
  circuitInfoUrl?: string; // Link to racingcircuits.info page
  setupRecommendations: {
    aerodynamics: {
      frontWing: number;
      rearWing: number;
      priority: string;
    };
    suspension: {
      springs: 'Soft' | 'Medium' | 'Stiff';
      dampers: 'Soft' | 'Medium' | 'Stiff';
      priority: string;
    };
    transmission: {
      gearing: 'Short' | 'Medium' | 'Long';
      differential: 'Low' | 'Medium' | 'High';
      priority: string;
    };
    brakes: {
      bias: number;
      cooling: 'Low' | 'Medium' | 'High';
      priority: string;
    };
  };
  strategy: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export const trackDatabase: TrackCharacteristics[] = [
  // Power/Low Downforce Tracks
  {
    id: 'monza',
    name: 'Monza',
    country: 'Italy',
    length: 5.793,
    corners: 11,
    elevation: 'Low',
    downforceLevel: 'Low',
    trackType: 'Power',
    imageUrl: '/track-images/monza.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/italy/monza.html',
    keyCharacteristics: [
      'Long straights with chicanes',
      'High top speeds critical',
      'Low downforce essential',
      'Slipstream battles common'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 8,
        rearWing: 12,
        priority: 'Minimum drag for maximum straight-line speed'
      },
      suspension: {
        springs: 'Stiff',
        dampers: 'Medium',
        priority: 'Stability under braking from high speed'
      },
      transmission: {
        gearing: 'Long',
        differential: 'Low',
        priority: 'Maximum top speed on long straights'
      },
      brakes: {
        bias: 54,
        cooling: 'High',
        priority: 'Manage heat from high-speed braking'
      }
    },
    strategy: 'Minimize drag at all costs. Focus on straight-line speed over cornering performance.',
    difficulty: 'Beginner'
  },
  {
    id: 'spa',
    name: 'Spa-Francorchamps',
    country: 'Belgium',
    length: 7.004,
    corners: 19,
    elevation: 'High',
    downforceLevel: 'Low',
    trackType: 'High-Speed',
    imageUrl: '/track-images/spa.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/belgium/spa-francorchamps.html',
    keyCharacteristics: [
      'Longest track with massive elevation',
      'Combination of high-speed and technical sections',
      'Weather often a factor',
      'Requires low drag setup'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 15,
        rearWing: 20,
        priority: 'Low drag for Kemmel Straight efficiency'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Balance for varied corner speeds and elevation'
      },
      transmission: {
        gearing: 'Long',
        differential: 'Medium',
        priority: 'Top speed for long straights'
      },
      brakes: {
        bias: 56,
        cooling: 'Medium',
        priority: 'Consistent performance over long lap'
      }
    },
    strategy: 'Balance low drag for straights with enough downforce for Eau Rouge/Raidillon complex.',
    difficulty: 'Advanced'
  },
  {
    id: 'paul_ricard',
    name: 'Paul Ricard',
    country: 'France',
    length: 5.842,
    corners: 15,
    elevation: 'Low',
    downforceLevel: 'Low',
    trackType: 'Power',
    imageUrl: '/track-images/paul-ricard.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/france/paul-ricard.html',
    keyCharacteristics: [
      'Long Mistral straight',
      'Variety of corner speeds',
      'Low drag setup favored',
      'Good overtaking opportunities'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 12,
        rearWing: 16,
        priority: 'Low drag for Mistral straight advantage'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Balance for mixed corner types'
      },
      transmission: {
        gearing: 'Long',
        differential: 'Low',
        priority: 'Maximum straight-line performance'
      },
      brakes: {
        bias: 55,
        cooling: 'Medium',
        priority: 'Consistent braking into chicanes'
      }
    },
    strategy: 'Prioritize straight-line speed while maintaining adequate cornering ability.',
    difficulty: 'Intermediate'
  },
  {
    id: 'red_bull_ring',
    name: 'Red Bull Ring',
    country: 'Austria',
    length: 4.318,
    corners: 10,
    elevation: 'High',
    downforceLevel: 'Low',
    trackType: 'Power',
    imageUrl: '/track-images/red-bull-ring.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/austria/red-bull-ring-a-1-ring-osterrichring.html',
    keyCharacteristics: [
      'Short lap with long straights',
      'Significant elevation changes',
      'Power circuit characteristics',
      'Hard braking zones'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 10,
        rearWing: 14,
        priority: 'Low drag for straight-line advantage'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Stiff',
        priority: 'Control over elevation changes'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Balance for short straights and corners'
      },
      brakes: {
        bias: 57,
        cooling: 'High',
        priority: 'Heavy braking from high speeds'
      }
    },
    strategy: 'Setup for straight-line speed while managing elevation changes effectively.',
    difficulty: 'Intermediate'
  },

  // Medium Downforce Tracks
  {
    id: 'silverstone',
    name: 'Silverstone',
    country: 'United Kingdom',
    length: 5.891,
    corners: 18,
    elevation: 'Low',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/silverstone.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/united-kingdom/silverstone.html',
    keyCharacteristics: [
      'Mix of high and medium speed corners',
      'Long Hangar Straight',
      'Flowing corner combinations',
      'Good balance of power and downforce needed'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 25,
        rearWing: 30,
        priority: 'Balance between cornering and straight-line speed'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Stable platform for high-speed corners'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Balanced for acceleration and top speed'
      },
      brakes: {
        bias: 56,
        cooling: 'Medium',
        priority: 'Consistent performance in varied corners'
      }
    },
    strategy: 'Find optimal balance between cornering downforce and straight-line efficiency.',
    difficulty: 'Intermediate'
  },
  {
    id: 'brands_hatch',
    name: 'Brands Hatch GP',
    country: 'United Kingdom',
    length: 3.908,
    corners: 9,
    elevation: 'High',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/brands-hatch.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/united-kingdom/brands-hatch.html',
    keyCharacteristics: [
      'Significant elevation changes',
      'Challenging corner combinations',
      'Requires good suspension setup',
      'Mix of corner speeds'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 28,
        rearWing: 32,
        priority: 'Moderate downforce for elevation changes'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Stiff',
        priority: 'Control over elevation changes and kerbs'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Versatility for varied corner speeds'
      },
      brakes: {
        bias: 55,
        cooling: 'Medium',
        priority: 'Stable braking on gradients'
      }
    },
    strategy: 'Setup for versatility to handle elevation changes and varied corner speeds.',
    difficulty: 'Advanced'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    length: 4.675,
    corners: 16,
    elevation: 'Medium',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/barcelona.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/spain/circuit-de-barcelona-catalunya.html',
    keyCharacteristics: [
      'Mix of slow and fast corners',
      'Technical sector 3',
      'Long front straight',
      'Tests all aspects of car setup'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 26,
        rearWing: 30,
        priority: 'Balanced downforce for mixed corner speeds'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Consistent grip across varied corners'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Flexibility for different corner types'
      },
      brakes: {
        bias: 57,
        cooling: 'Medium',
        priority: 'Stability for varied braking zones'
      }
    },
    strategy: 'Create a balanced setup that works well across all corner types.',
    difficulty: 'Intermediate'
  },
  {
    id: 'zandvoort',
    name: 'Zandvoort',
    country: 'Netherlands',
    length: 4.259,
    corners: 14,
    elevation: 'Medium',
    downforceLevel: 'Medium',
    trackType: 'Technical',
    imageUrl: '/track-images/zandvoort.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/netherlands/zandvoort.html',
    keyCharacteristics: [
      'Narrow and technical layout',
      'Banked final corner',
      'Limited overtaking opportunities',
      'Requires precise setup'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 30,
        rearWing: 34,
        priority: 'Moderate-high downforce for technical sections'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Balance for banking and regular corners'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Precise control for technical layout'
      },
      brakes: {
        bias: 58,
        cooling: 'Medium',
        priority: 'Stable braking for close racing'
      }
    },
    strategy: 'Focus on cornering performance and precision for the technical layout.',
    difficulty: 'Advanced'
  },
  {
    id: 'imola',
    name: 'Imola',
    country: 'Italy',
    length: 4.909,
    corners: 19,
    elevation: 'Medium',
    downforceLevel: 'Medium',
    trackType: 'Technical',
    imageUrl: '/track-images/interlagos.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/south-america/brazil/interlagos.html',
    keyCharacteristics: [
      'Historic and challenging layout',
      'Mix of fast and slow corners',
      'Limited overtaking opportunities',
      'Requires downforce for final sector'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 28,
        rearWing: 32,
        priority: 'Moderate downforce for technical sections'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Stable platform for mixed corner speeds'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Balance for acceleration and cornering'
      },
      brakes: {
        bias: 56,
        cooling: 'Medium',
        priority: 'Consistent performance across lap'
      }
    },
    strategy: 'Balance cornering performance with straight-line capability.',
    difficulty: 'Advanced'
  },
  {
    id: 'mugello',
    name: 'Mugello',
    country: 'Italy',
    length: 5.245,
    corners: 15,
    elevation: 'High',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/mugello.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/italy/mugello.html',
    keyCharacteristics: [
      'Fast and flowing layout',
      'Significant elevation changes',
      'High-speed corners',
      'Beautiful but challenging'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 24,
        rearWing: 28,
        priority: 'Moderate downforce for flowing corners'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Stiff',
        priority: 'Control over elevation and high speeds'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Balance for flowing layout'
      },
      brakes: {
        bias: 55,
        cooling: 'Medium',
        priority: 'Consistent braking at high speeds'
      }
    },
    strategy: 'Setup for high-speed stability while maintaining cornering ability.',
    difficulty: 'Advanced'
  },
  {
    id: 'kyalami',
    name: 'Kyalami',
    country: 'South Africa',
    length: 4.522,
    corners: 16,
    elevation: 'High',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/kyalami.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/africa/south-africa/kyalami.html',
    keyCharacteristics: [
      'High altitude affects engine performance',
      'Long main straight',
      'Challenging corner combinations',
      'Elevation changes throughout'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 20,
        rearWing: 25,
        priority: 'Moderate downforce accounting for altitude'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Stability over elevation changes'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Compensate for reduced power at altitude'
      },
      brakes: {
        bias: 56,
        cooling: 'High',
        priority: 'Consistent performance in thin air'
      }
    },
    strategy: 'Account for high altitude effects while balancing aerodynamics.',
    difficulty: 'Advanced'
  },

  // High Downforce Tracks
  {
    id: 'hungaroring',
    name: 'Hungaroring',
    country: 'Hungary',
    length: 4.381,
    corners: 14,
    elevation: 'Medium',
    downforceLevel: 'High',
    trackType: 'Technical',
    imageUrl: '/track-images/hungaroring.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/hungary/hungaroring.html',
    keyCharacteristics: [
      'Tight and twisty layout',
      'Limited overtaking opportunities',
      'Requires maximum downforce',
      'Hard on brakes and tires'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 40,
        rearWing: 45,
        priority: 'Maximum downforce for cornering grip'
      },
      suspension: {
        springs: 'Stiff',
        dampers: 'Medium',
        priority: 'Precise handling for tight corners'
      },
      transmission: {
        gearing: 'Short',
        differential: 'High',
        priority: 'Acceleration out of slow corners'
      },
      brakes: {
        bias: 58,
        cooling: 'High',
        priority: 'Stability under heavy braking zones'
      }
    },
    strategy: 'Focus on cornering performance over straight-line speed.',
    difficulty: 'Intermediate'
  },
  {
    id: 'monaco',
    name: 'Monaco',
    country: 'Monaco',
    length: 3.337,
    corners: 19,
    elevation: 'Medium',
    downforceLevel: 'High',
    trackType: 'Technical',
    imageUrl: '/track-images/monaco.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/monaco/monte-carlo.html',
    keyCharacteristics: [
      'Street circuit with barriers',
      'Very narrow and technical',
      'No room for error',
      'Maximum downforce essential'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 45,
        rearWing: 50,
        priority: 'Maximum downforce for confidence and grip'
      },
      suspension: {
        springs: 'Soft',
        dampers: 'Soft',
        priority: 'Compliance over bumps and kerbs'
      },
      transmission: {
        gearing: 'Short',
        differential: 'Medium',
        priority: 'Acceleration from tight hairpins'
      },
      brakes: {
        bias: 60,
        cooling: 'Medium',
        priority: 'Stable braking into tight corners'
      }
    },
    strategy: 'Prioritize confidence and predictability with maximum downforce.',
    difficulty: 'Expert'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    length: 5.063,
    corners: 23,
    elevation: 'Low',
    downforceLevel: 'High',
    trackType: 'Technical',
    imageUrl: '/track-images/singapore.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/asia/singapore/marina-bay-singapore.html',
    keyCharacteristics: [
      'Street circuit with barriers',
      'Many corners and direction changes',
      'Hot and humid conditions',
      'Requires maximum downforce'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 42,
        rearWing: 47,
        priority: 'High downforce for numerous corners'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Balance for street circuit bumps'
      },
      transmission: {
        gearing: 'Short',
        differential: 'High',
        priority: 'Acceleration from numerous slow corners'
      },
      brakes: {
        bias: 59,
        cooling: 'High',
        priority: 'Heat management in hot conditions'
      }
    },
    strategy: 'Maximum downforce setup with focus on cooling and reliability.',
    difficulty: 'Expert'
  },
  {
    id: 'zolder',
    name: 'Zolder',
    country: 'Belgium',
    length: 4.011,
    corners: 18,
    elevation: 'Medium',
    downforceLevel: 'High',
    trackType: 'Technical',
    imageUrl: '/track-images/zolder.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/belgium/zolder.html',
    keyCharacteristics: [
      'Technical with varied corner speeds',
      'Good overtaking opportunities',
      'Requires balanced setup',
      'High downforce needs'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 38,
        rearWing: 42,
        priority: 'High downforce for technical sections'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Consistent grip across varied corners'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Flexibility for different corner types'
      },
      brakes: {
        bias: 57,
        cooling: 'Medium',
        priority: 'Reliability for close racing'
      }
    },
    strategy: 'High downforce setup with versatility for mixed corner speeds.',
    difficulty: 'Intermediate'
  },

  // Special/Unique Tracks
  {
    id: 'nordschleife',
    name: 'Nürburgring Nordschleife',
    country: 'Germany',
    length: 20.832,
    corners: 73,
    elevation: 'High',
    downforceLevel: 'Medium',
    trackType: 'Technical',
    imageUrl: '/track-images/nordschleife.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/germany/nurburgring.html',
    keyCharacteristics: [
      'Extremely long and challenging',
      'Massive elevation changes',
      'Every type of corner imaginable',
      'Requires very versatile setup'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 25,
        rearWing: 30,
        priority: 'Balanced downforce for varied sections'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Soft',
        priority: 'Compliance for bumps and elevation changes'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Versatility for all corner types'
      },
      brakes: {
        bias: 56,
        cooling: 'High',
        priority: 'Reliability over extremely long lap'
      }
    },
    strategy: 'Setup for overall versatility and reliability over single-lap performance.',
    difficulty: 'Expert'
  },
  {
    id: 'nurburgring_gp',
    name: 'Nürburgring GP',
    country: 'Germany',
    length: 5.148,
    corners: 15,
    elevation: 'Medium',
    downforceLevel: 'High',
    trackType: 'Technical',
    imageUrl: '/track-images/nurburgring-gp.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/europe/germany/nurburgring.html',
    keyCharacteristics: [
      'Undulating terrain with challenging elevation changes',
      'Mix of high-speed straights and tight technical corners',
      'Iconic banked Karussell hairpin turn',
      'Multiple heavy braking zones requiring strong stopping power',
      'Prone to understeer in long corners with off-camber sections'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 7,
        rearWing: 8,
        priority: 'High downforce bias toward rear for stability through slow corners while maintaining braking stability'
      },
      suspension: {
        springs: 'Stiff',
        dampers: 'Medium',
        priority: 'Responsive change of direction through technical sections while maintaining traction out of hairpins'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'High',
        priority: 'Good traction out of slow corners with stable braking characteristics for heavy braking zones'
      },
      brakes: {
        bias: 55,
        cooling: 'Medium',
        priority: 'Strong braking performance for multiple heavy braking zones with adequate cooling'
      }
    },
    strategy: 'Requires high-downforce approach emphasizing mechanical grip and aerodynamic stability through technical corner sequences. Focus on managing understeer tendencies while maintaining strong traction out of hairpins and chicanes.',
    difficulty: 'Advanced'
  },
  {
    id: 'suzuka',
    name: 'Suzuka',
    country: 'Japan',
    length: 5.807,
    corners: 18,
    elevation: 'Medium',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/suzuka.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/asia/japan/suzuka.html',
    keyCharacteristics: [
      'Figure-8 layout with crossover',
      'Mix of technical and high-speed sections',
      'Challenging 130R corner',
      'Requires balanced approach'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 27,
        rearWing: 31,
        priority: 'Balanced downforce for varied sections'
      },
      suspension: {
        springs: 'Medium',
        dampers: 'Medium',
        priority: 'Stable platform for mixed demands'
      },
      transmission: {
        gearing: 'Medium',
        differential: 'Medium',
        priority: 'Balance for technical and high-speed areas'
      },
      brakes: {
        bias: 56,
        cooling: 'Medium',
        priority: 'Consistent performance across lap'
      }
    },
    strategy: 'Balanced setup that works well in both technical and high-speed sections.',
    difficulty: 'Advanced'
  },
  {
    id: 'mount_panorama',
    name: 'Mount Panorama (Bathurst)',
    country: 'Australia',
    length: 6.213,
    corners: 23,
    elevation: 'High',
    downforceLevel: 'Medium',
    trackType: 'Balanced',
    imageUrl: '/track-images/mount-panorama.png',
    circuitInfoUrl: 'https://www.racingcircuits.info/australasia/australia/bathurst-mount-panorama.html',
    keyCharacteristics: [
      'Extreme elevation changes',
      'Very narrow mountain circuit',
      'Conrod Straight at high altitude',
      'Challenging descent section'
    ],
    setupRecommendations: {
      aerodynamics: {
        frontWing: 22,
        rearWing: 26,
        priority: 'Moderate downforce for mountain section'
      },
      suspension: {
        springs: 'Soft',
        dampers: 'Medium',
        priority: 'Compliance for extreme elevation changes'
      },
      transmission: {
        gearing: 'Long',
        differential: 'Medium',
        priority: 'Top speed for Conrod Straight'
      },
      brakes: {
        bias: 54,
        cooling: 'High',
        priority: 'Heat management on long descent'
      }
    },
    strategy: 'Setup for extreme elevation changes while maximizing straight-line speed.',
    difficulty: 'Expert'
  }
];

export const getTracksByDownforce = (level: 'Low' | 'Medium' | 'High') => {
  return trackDatabase.filter(track => track.downforceLevel === level);
};

export const getTracksByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') => {
  return trackDatabase.filter(track => track.difficulty === difficulty);
};