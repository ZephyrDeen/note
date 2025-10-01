import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


export function LowPolyEarth(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/earth-v2.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Material002_0.geometry}
        material={materials['Material.002']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
        onClick={(e) => {
          if (e.uv) {
            console.log('点击 UV:', e.uv.x.toFixed(3), e.uv.y.toFixed(3))
          }
        }}
      />
    </group>
  )
}

useGLTF.preload('/earth-v2.glb')