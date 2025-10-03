


function Marker({ uv, r = 1 }) {
  if (!uv) return null
  const lon = uv.x * 2 * Math.PI
  const lat = (1 - uv.y) * Math.PI - Math.PI / 2
  const x = r * Math.cos(lat) * Math.cos(lon)
  const y = r * Math.sin(lat)
  const z = r * Math.cos(lat) * Math.sin(lon)
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.02, 16, 16]} /> 
      <meshStandardMaterial color="red" depthTest={false}/>
    </mesh>
  )
}

export default Marker