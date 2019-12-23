import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;
const PixiComponent = () => {
  const canvasRef = useRef(null);
  // const socket = useSelector((state) => state.socket);

  useEffect(() => {
    const app = new PIXI.Application({ width: 600, height: 600, transparent: false });
    canvasRef.current.appendChild(app.view);

    const style = new PIXI.TextStyle({
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
    const richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    richText.x = 30;
    richText.y = 180;

    app.stage.addChild(richText);
    socket = io('/game');
  }, []);

  return (
    <div ref={canvasRef} />
  );
};

export default PixiComponent;
