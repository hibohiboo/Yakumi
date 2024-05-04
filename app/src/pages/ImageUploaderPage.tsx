import { useImageUploaderPageHooks } from '@yakumi-app/hooks/useImageUploaderPageHooks';

function ImageUploaderPage() {
  const vm = useImageUploaderPageHooks();

  return (
    <div style={{ margin: '1rem' }}>
      <h1>画像アップロード</h1>
      <article>
        <h2>アイコン</h2>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={vm.handleFileSelection}
        ></input>
        <button onClick={vm.handleFileUpload}>アップロード</button>
        {vm.uploadStatus}
        <button onClick={vm.extraDownload}>サンプルダウンロード</button>
      </article>
    </div>
  );
}

export default ImageUploaderPage;
