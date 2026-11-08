'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
function Computer() {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const scroll = useRef(0);
  useEffect(() => {
    const move = () => invalidate();
    const onScroll = () => {
      scroll.current = Math.sin(window.scrollY / 1800) * 0.06;
      invalidate();
    };
    gl.domElement.addEventListener('pointermove', move);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      gl.domElement.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', onScroll);
    };
  }, [gl, invalidate]);
  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(512, 320, 0, 512, 320, 600);
    grad.addColorStop(0, '#073323');
    grad.addColorStop(1, '#020806');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);
    ctx.strokeStyle = '#00f568';
    ctx.lineWidth = 13;
    ctx.beginPath();
    ctx.moveTo(510, 135);
    ctx.lineTo(590, 275);
    ctx.lineTo(430, 275);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 68px Arial';
    ctx.fillText('Lonyx', 465, 385);
    ctx.fillStyle = '#00f568';
    ctx.fillText('Web', 626, 385);
    ctx.font = '17px Arial';
    ctx.fillStyle = '#a1b2ab';
    ctx.fillText('SEU PRÓXIMO NÍVEL COMEÇA AQUI.', 512, 455);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const targetX = -0.06 + pointer.y * 0.08 + scroll.current;
    const targetY = -0.28 + pointer.x * 0.19;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
    if (
      Math.abs(group.current.rotation.y - targetY) > 0.001 ||
      Math.abs(group.current.rotation.x - targetX) > 0.001 ||
      clock.elapsedTime < 1
    )
      invalidate();
  });
  return (
    <group ref={group} rotation={[-0.06, -0.28, 0]} position={[0, 0.05, 0]}>
      <mesh position={[0, -0.63, 0.35]}>
        <boxGeometry args={[3.4, 0.09, 2.1]} />
        <meshStandardMaterial color="#7d9185" metalness={0.62} roughness={0.26} />
      </mesh>
      <mesh position={[0, -0.575, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.9, 1.52]} />
        <meshStandardMaterial color="#0c1311" roughness={0.65} />
      </mesh>
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 12 }, (_, c) => (
          <mesh key={`${r}-${c}`} position={[-1.28 + c * 0.23, -0.565, -0.17 + r * 0.21]}>
            <boxGeometry args={[0.18, 0.015, 0.15]} />
            <meshStandardMaterial color="#29342f" metalness={0.6} roughness={0.4} />
          </mesh>
        )),
      )}
      <group position={[0, 0.4, -0.64]} rotation={[-0.13, 0, 0]}>
        <mesh>
          <boxGeometry args={[3.38, 2.1, 0.095]} />
          <meshStandardMaterial color="#667e6d" metalness={0.62} roughness={0.24} />
        </mesh>
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[3.15, 1.86]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </group>
  );
}
export default function LaptopScene() {
  return (
    <div className="canvas-wrap">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [4, 2.3, 6.5], fov: 37 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[-4, 3, 6]} intensity={3} color="#b3dbca" />
        <directionalLight position={[2, 5, 4]} intensity={4} color="#e9fff5" />
        <pointLight position={[-3, 1, 2]} intensity={15} color="#00f568" />
        <pointLight position={[3, -1, 1]} intensity={5} color="#00f568" />
        <Computer />
      </Canvas>
    </div>
  );
}
