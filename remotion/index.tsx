import { Composition, registerRoot } from 'remotion';
import { IntroFilm, INTRO_FRAMES } from '../app/intro-film';
import '../app/envelope-intro.css';
import '../app/desk-scene.css';
function Root() { return <>
  <Composition id="EnvelopeDesktop" component={IntroFilm} durationInFrames={INTRO_FRAMES} fps={30} width={1440} height={900} />
  <Composition id="EnvelopeMobile" component={IntroFilm} durationInFrames={INTRO_FRAMES} fps={30} width={390} height={844} />
</>; }
registerRoot(Root);
