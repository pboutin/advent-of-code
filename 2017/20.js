const fs = require('fs');

const input = fs.readFileSync('20_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const particles = input.map((line) => {
  const [position, velocity, acceleration] = line.split(', ');
  return {
    position: position.match(/<(.+)>/)[1].split(',').map(Number),
    velocity: velocity.match(/<(.+)>/)[1].split(',').map(Number),
    acceleration: acceleration.match(/<(.+)>/)[1].split(',').map(Number)
  };
});

const sumVector = (vectorA, vectorB) => [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2]]
const distanceVector = (vectorA, vectorB) => Math.abs(vectorA[0] - vectorB[0]) + Math.abs(vectorA[1] - vectorB[1]) + Math.abs(vectorA[2] - vectorB[2])

/**
 * Part I
********************************/

for (let i = 0; i < 500; i++) {
  // Move the particles for one tick
  particles.forEach((particle, particleIndex) => {
    particle.velocity = sumVector(particle.velocity, particle.acceleration);
    particle.position = sumVector(particle.position, particle.velocity);
  });

  // Check for collisions
  particles.forEach((particle, particleIndex) => {
    if (particle.destroyed) return;
    particles.forEach((otherParticle, otherParticleIndex) => {
      if (otherParticle.destroyed) return;

      if (particleIndex !== otherParticleIndex && distanceVector(otherParticle.position, particle.position) === 0) {
        particle.destroyed = true;
        otherParticle.destroyed = true;
      }
    });
  });
}

let minimumDistance = Infinity;
const closestParticleIndex = particles.reduce((closestIndex, particle, particleIndex) => {
  const distance = distanceVector(particle.position, [0,0,0]);
  if (distance < minimumDistance) {
    minimumDistance = distance;
    return particleIndex;
  }
  return closestIndex;
}, null);


console.log('First output', closestParticleIndex);

/**
 * Part II
********************************/

const remainingParticles = particles.filter((particle) => !particle.destroyed);

console.log('Second output', remainingParticles.length);
