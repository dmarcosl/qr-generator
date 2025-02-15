import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';

const QRGenerator = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [qrOptions, setQrOptions] = useState({
    fgColor: '#000000',
    bgColor: '#ffffff',
    border: false,
    borderColor: '#000000',
    borderWidth: 2,
    margin: 1,
    text: ''
  });
  const [logo, setLogo] = useState(null);
  const qrRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    const qrContainer = document.querySelector('.qr-wrapper');
    if (!qrContainer) return;

    const convertSvgToImage = (container) => {
      return new Promise((resolve) => {
        // Si hay un logo, esperar a que se cargue
        if (logo) {
          const img = new Image();
          img.onload = () => {
            html2canvas(container, {
              backgroundColor: qrOptions.bgColor,
              scale: 1,
              useCORS: true,
              allowTaint: true,
            }).then(canvas => {
              const width = canvas.width;
              const height = canvas.height + (qrOptions.text ? 40 : 0);
              
              const finalCanvas = document.createElement('canvas');
              const finalCtx = finalCanvas.getContext('2d');
              finalCanvas.width = width;
              finalCanvas.height = height;
              
              finalCtx.fillStyle = qrOptions.bgColor;
              finalCtx.fillRect(0, 0, width, height);
              finalCtx.drawImage(canvas, 0, 0);
              
              if (qrOptions.text) {
                finalCtx.fillStyle = qrOptions.fgColor;
                finalCtx.font = '16px Arial';
                finalCtx.textAlign = 'center';
                finalCtx.fillText(qrOptions.text, width / 2, height - 20);
              }
              
              resolve(finalCanvas);
            });
          };
          img.src = logo;
        } else {
          // Si no hay logo, proceder normalmente
          html2canvas(container, {
            backgroundColor: qrOptions.bgColor,
            scale: 1,
            useCORS: true,
            allowTaint: true,
          }).then(canvas => {
            const width = canvas.width;
            const height = canvas.height + (qrOptions.text ? 40 : 0);
            
            const finalCanvas = document.createElement('canvas');
            const finalCtx = finalCanvas.getContext('2d');
            finalCanvas.width = width;
            finalCanvas.height = height;
            
            finalCtx.fillStyle = qrOptions.bgColor;
            finalCtx.fillRect(0, 0, width, height);
            finalCtx.drawImage(canvas, 0, 0);
            
            if (qrOptions.text) {
              finalCtx.fillStyle = qrOptions.fgColor;
              finalCtx.font = '16px Arial';
              finalCtx.textAlign = 'center';
              finalCtx.fillText(qrOptions.text, width / 2, height - 20);
            }
            
            resolve(finalCanvas);
          });
        }
      });
    };

    const downloadCanvas = (canvas) => {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    convertSvgToImage(qrContainer).then(downloadCanvas);
  };

  return (
    <Container>
      <InputGroup>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t('urlPlaceholder')}
        />
      </InputGroup>

      <OptionsGrid>
        <OptionGroup>
          <Label>{t('qrColor')}</Label>
          <ColorInput
            type="color"
            value={qrOptions.fgColor}
            onChange={(e) => setQrOptions({...qrOptions, fgColor: e.target.value})}
          />
        </OptionGroup>

        <OptionGroup>
          <Label>{t('bgColor')}</Label>
          <ColorInput
            type="color"
            value={qrOptions.bgColor}
            onChange={(e) => setQrOptions({...qrOptions, bgColor: e.target.value})}
          />
        </OptionGroup>

        <OptionGroup>
          <Label>
            {t('border')}
            <Checkbox
              type="checkbox"
              checked={qrOptions.border}
              onChange={(e) => setQrOptions({...qrOptions, border: e.target.checked})}
            />
          </Label>
          {qrOptions.border && (
            <BorderControls>
              <ColorInput
                type="color"
                value={qrOptions.borderColor}
                onChange={(e) => setQrOptions({...qrOptions, borderColor: e.target.value})}
              />
              <BorderRange
                type="range"
                min="1"
                max="10"
                value={qrOptions.borderWidth}
                onChange={(e) => setQrOptions({...qrOptions, borderWidth: Number(e.target.value)})}
              />
              <span>{qrOptions.borderWidth}px</span>
            </BorderControls>
          )}
        </OptionGroup>

        <OptionGroup>
          <Label>{t('margin')}</Label>
          <Range
            type="range"
            min="0"
            max="4"
            step="1"
            value={qrOptions.margin}
            onChange={(e) => setQrOptions({...qrOptions, margin: Number(e.target.value)})}
          />
        </OptionGroup>

        <OptionGroup>
          <Label>{t('logoUpload')}</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </OptionGroup>

        <OptionGroup>
          <Label>{t('qrText')}</Label>
          <Input
            type="text"
            value={qrOptions.text}
            onChange={(e) => setQrOptions({...qrOptions, text: e.target.value})}
            placeholder={t('textPlaceholder')}
          />
        </OptionGroup>
      </OptionsGrid>

      <QRContainer style={{ backgroundColor: qrOptions.bgColor }}>
        <QRWrapper 
          style={{
            border: qrOptions.border ? `${qrOptions.borderWidth}px solid ${qrOptions.borderColor}` : 'none',
            backgroundColor: qrOptions.bgColor,
            padding: qrOptions.margin * 25
          }}
          className="qr-wrapper"
        >
          {url && (
            <QRCodeSVG
              ref={qrRef}
              value={url}
              size={300}
              fgColor={qrOptions.fgColor}
              bgColor={qrOptions.bgColor}
              level="H"
              includeMargin={false}
              imageSettings={logo ? {
                src: logo,
                height: 60,
                width: 60,
                excavate: true,
              } : undefined}
            />
          )}
        </QRWrapper>
        {qrOptions.text && (
          <QRText style={{ 
            color: qrOptions.fgColor,
            backgroundColor: qrOptions.bgColor,
            padding: '5px 10px',
            borderRadius: '5px'
          }}>
            {qrOptions.text}
          </QRText>
        )}
      </QRContainer>

      {url && (
        <DownloadButton onClick={downloadQR}>
          {t('download')}
        </DownloadButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 5px;
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ColorInput = styled.input`
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const QRContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: center;
`;

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: background-color 0.3s ease;
`;

const QRText = styled.p`
  margin: 10px 0 0;
  transition: color 0.3s ease;
`;

const DownloadButton = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.text};
`;

const Range = styled.input`
  width: 100%;
  margin: 10px 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: ${props => props.theme.text};
    border-radius: 2px;
    opacity: 0.5;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #4CAF50;
    border-radius: 50%;
    margin-top: -6px;
    cursor: pointer;
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
    background: ${props => props.theme.text};
    border-radius: 2px;
    opacity: 0.5;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #4CAF50;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const BorderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BorderRange = styled(Range)`
  width: 100px;
  margin: 0;
`;

export default QRGenerator; 