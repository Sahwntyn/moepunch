import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Environment, Gltf } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation, EcctrlJoystick } from "ecctrl";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const characterURL = "/models/Demon.glb";
const mapURL = "/models/fantasy_game_inn2-transformed.glb";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
];

const animationSet = {
  idle: "CharacterArmature|Idle",
  walk: "CharacterArmature|Walk",
  run: "CharacterArmature|Run",
  jump: "CharacterArmature|Jump",
  jumpIdle: "CharacterArmature|Jump_Idle",
  jumpLand: "CharacterArmature|Jump_Land",
  fall: "CharacterArmature|Duck",
  action1: "CharacterArmature|Wave",
  action2: "CharacterArmature|Death",
  action3: "CharacterArmature|HitReact",
  action4: "CharacterArmature|Punch",
};

function App() {
  return (
    <>
      <EcctrlJoystick buttonNumber={5} />
      <Canvas shadows>
        <Perf position="top-left" minimal />
        <Environment files="/lights/night.hdr" ground={{ scale: 100 }} />
        <directionalLight
          intensity={0.7}
          color={"#FFFFED"}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
          shadow-camera-top={20}
          shadow-camera-right={20}
          shadow-camera-bottom={-20}
          shadow-camera-left={-20}
        />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <Physics timeStep="vary">
            <KeyboardControls map={keyboardMap}>
              <Ecctrl animated ccd type="dynamic">
                <EcctrlAnimation
                  characterURL={characterURL}
                  animationSet={animationSet}
                >
                  <Gltf
                    castShadow
                    receiveShadow
                    scale={0.315}
                    position={[0, -0.85, 0]}
                    src={characterURL}
                  />
                </EcctrlAnimation>
              </Ecctrl>
            </KeyboardControls>
            <RigidBody type="fixed" colliders="trimesh" ccd>
              <Gltf
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.11}
                src={mapURL}
              />
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
