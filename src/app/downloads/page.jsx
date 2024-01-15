import { Col, Container, Row } from 'react-bootstrap';

export const metadata = {
  title: 'Downloads',
};

export default async function DownloadsPage() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="underlined underline-primary">
            Downloads&nbsp;
            <small className="text-muted">ダウンロード</small>
          </h1>
          <h4 className="underline-dark">
            Emulator Setup&nbsp;
            <small className="text-muted">エミュレータ</small>
          </h4>
          <Row as="dl">
            <Col as="dt" md={2}>
              PCSX2
            </Col>
            <Col as="dd" md={10}>
              <a
                href="https://pcsx2.net/downloads"
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
              <br />
              PCSX2 is a PlayStation 2 Emulator. This page will help you set the
              software up to play .hack//fragment online on the Netslum server.
              <br />
              Download and install the latest stable version or extract the
              portable version wherever you want it to be.
              <br />
              If you used the regular installed version of PCSX2 then the
              default location of the bios folder is Documents/PCSX2/bios and
              the plugins folder is C:/Program Files (x86)/PCSX2/Plugins.
              <br />
              If you used the Portable installation of PCSX2 then both of these
              folders are in the same folder you extracted the files to.
            </Col>
            <Col as="dt" md={2}>
              BIOS Files
            </Col>
            <Col as="dd" md={10}>
              The BIOS is essentially the core operating system of the
              PlayStation 2.
              <br />
              For legal reasons I can&apos;t provide a link to any BIOS files,
              but they are required to run the emulator.
              <br />
              Once you have obtained them, place them into the bios folder.
            </Col>
            <Col as="dt" md={2}>
              CLR_DEV9
            </Col>
            <Col as="dd" md={10}>
              <a
                href="https://github.com/TheLastRar/CLR-DEV9/releases"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              <br />
              This is the DEV9 network plugin for PCSX2. It will allow your
              emulator to connect to the internet.
              <br />
              Download the x86 version, and extract it to the Plugins folder,
              then launch PCSX2, select &quot;Config&rarr;&quot;Plugins/BIOS
              Selector&quot; and then select CLR_DEV9 from drop-down menu.
              <br />
              Click Apply, then configure this plugin by clicking
              &quot;Configure&quot; next to the drop down box, clicking
              &quot;Options&quot; next to &quot;Ethernet&quot; and then
              selecting your network adapter from the drop down list.
            </Col>
            <Col as="dt" md={2}>
              Updated Graphics Plugins
            </Col>
            <Col as="dd" md={10}>
              <a href="/GSdx32-NetFix.zip">Download</a>
              <br />
              The graphics plugin that comes with PCSX2 by default doesn&apos;t
              render fragment&apos;s network connection setup properly.
              <br />
              This fixed set of graphics plugins are compatible with PCSX2 1.4.0
              and higher and allow the emulator to render fragment&apos;s built
              in network config, allowing you to set up your connection without
              the need of Sony&apos;s separate Network Connection Start-Up Disc.
              <br />
              Simply extract these files over the originals in the Plugins
              folder.
            </Col>
            <Col as="dt" md={2}>
              .hack//fragment Game Client
            </Col>
            <Col as="dd" md={10}>
              For legal reasons I can not provide a link to the game client. You
              will need to find a copy of the game yourself.
              <br />
              Once you&apos;ve obtained it either put the disc in the tray or
              select it from the ISO selector in PCSX2, then move on to the next
              step.
            </Col>
          </Row>
          <h5 className="underline-dark">
            Getting Connected&nbsp;
            <small className="text-muted">ネットワーク接続</small>
          </h5>
          <Row as="dl">
            <Col as="dt" md={2}>
              With Translation Patch
            </Col>
            <Col as="dd" md={10}>
              <a href="https://bbs.dothackers.org/viewtopic.php?f=6&t=80">
                Tellipatch
              </a>
              <br />
              The Tellipatcher is a program that installs the latest translation
              files for the game and patches it so that you can use the Netslum
              server to play online.
              <br />
              Instructions for use are contained in the BBS post above.
              <br />
              Once you have followed the instructions you can launch the game in
              PCSX2.
            </Col>
            <Col as="dt" md={2}>
              Without Translation Patch
            </Col>
            <Col as="dd" md={10}>
              <a href="https://github.com/Zero1UP/dot-Hack-Fragment-Patcher/releases">
                1up&apos;s Fragment Launcher
              </a>
              <br />
              This tool written by 1UP will connect your game client to the
              Netslum server and apply a few other patches to the game.
              <br />
              Download the .elf file. Open PCSX2 and click System&rarr;Run ELF.
              Select the .elf file, wait for it to load and follow the onscreen
              instructions.
              <br />
              <strong>
                You will need to launch the game via the .elf file every time.
              </strong>
            </Col>
          </Row>
          <h4 className="underline-dark">
            Optional&nbsp;
            <small className="text-muted">オプショナル</small>
          </h4>
          <Row as="dl">
            <Col as="dt" md={2}>
              CLR_USB
            </Col>
            <Col as="dd" md={10}>
              <a href="https://forums.pcsx2.net/Thread-Another-USBQemu-plugin-this-time-in-VB-net-Keyboard-only">
                Download
              </a>
              <br />
              This is a USB plugin for PCSX2 by Air Gamer (who also made
              CLR_DEV9). It will allow you to type with your keyboard in-game.
              <br />
              Download and extract the x86 version to the Plugins folder of your
              PCSX2 install then select this plugin from the Plugins menu.
              <br />
              <strong>
                Don&apos;t use this if you don&apos;t have a gamepad.
              </strong>
            </Col>
            <Col as="dt" md={2}>
              Area Server
            </Col>
            <Col as="dd" md={10}>
              <a target="_blank" href="/areaserver.zip">
                Download
              </a>
              <br />
              The Area Server is <strong>NOT REQUIRED</strong> to play the game.
              It is used to create unique keywords and fields for you and others
              to play in online mode.
              <br />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
