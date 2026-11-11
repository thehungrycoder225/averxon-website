# Jie — Three.js GLB blockout

## Files
- `jie.glb` — actual 3D geometry, material vertex colors, approximately 2.7 model units tall, facing +Z, Y-up.
- `index.html` — Three.js + OrbitControls + GLTFLoader live orbit demo using CDN modules.

## Run
From this directory:

```bash
python -m http.server 8000
```

Navigate to `http://localhost:8000/` in a browser. Requires internet access for Three.js CDN modules.

## Integration

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const model = await new GLTFLoader().loadAsync('/models/jie.glb');
scene.add(model.scene);
```

## Quality / constraints
This is an **approximate stylized geometric blockout**, not a high-fidelity image-to-3D reconstruction. It is not skinned, animated, retopologized, UV-unwrapped, or optimized for a final game character. For fidelity to the supplied reference and animation, use the front/side/back turnaround in a dedicated 3D reconstruction and rigging workflow, retaining the source design. No proprietary meshes are implied.
