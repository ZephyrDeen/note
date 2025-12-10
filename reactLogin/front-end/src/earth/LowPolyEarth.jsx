import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
// import Marker from './Marker'

export default function LowPolyEarth({ onPick, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/earth-v2.glb')
  const [uv, setUv] = useState(null)

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
            onPick?.(e.uv)
          }
        }}
      />
      {/* <Marker uv={uv} /> */}
    </group>
  )
}

useGLTF.preload('/earth-v2.glb')
