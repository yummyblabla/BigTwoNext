import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

const PixiComponent = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const app = new PIXI.Application({ width: 600, height: 600, transparent: false });
    canvasRef.current.appendChild(app.view);

    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    });
    var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    richText.x = 30;
    richText.y = 180;

    app.stage.addChild(richText);
  }, []);
  return (
    <div ref={canvasRef} />
  );
};

export default PixiComponent;
