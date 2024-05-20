import { useImageUploaderPageHooks } from '@yakumi-app/hooks/useImageUploaderPageHooks';

function ImageUploaderPage() {
  const vm = useImageUploaderPageHooks();

  return (
    <div style={{ margin: '1rem' }}>
      <article>
        <h1>画像アップロード</h1>
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
      <article>
        <h1>ユドナリウムルームアップロード</h1>
        <h2>アイコン</h2>
        <form onSubmit={vm.zipHandleSubmit}>
          <input
            type="file"
            accept="application/zip"
            name="zipFile"
            onChange={vm.handleFileSelection}
          ></input>
          <button type="submit">アップロード</button>
          {vm.uploadStatus}
        </form>
      </article>
    </div>
  );
}

export default ImageUploaderPage;
