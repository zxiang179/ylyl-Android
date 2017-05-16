package com.example.ykylapp1;

import com.example.ykylapp.R;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

	private WebView webview;  
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		webview = new WebView(this);
		//����WebView���ԣ��ܹ�ִ��Javascript�ű�  
		webview.getSettings().setJavaScriptEnabled(true);  
        //������Ҫ��ʾ����ҳ  
//		webview.loadUrl("file:///android_asset/src/app/login/login-home.html");
//		webview.loadUrl("http://192.168.1.132:8081/ykyl-ui-yu/src/app/login/login-home.html#/user");
//		webview.loadUrl("http://192.168.1.132:8081/src/app/login/login-home.html#/user");
//		webview.loadUrl("http://www.baidu.com");
		
//		webview.loadUrl("file:///android_asset/src/app/login/NewFile.html");
		//ʹ��webstorm
//		webview.loadUrl("http://192.168.1.132:8081/ykyl-ui-yu/src/app/login/login-home.html#/user");
		//ʹ��http-server
		webview.loadUrl("http://192.168.1.132:8080/src/app/login/login-home.html#/user");
		
		webview.setWebViewClient(new WebViewClient(){ 
		      public boolean shouldOverrideUrlLoading(WebView view, String url) {
		                 view.loadUrl(url);//��������ӵ�ʱ��������ԭ�������ϼ���URL
		                 return true;
		     }
		});   
		
		//����Web��ͼ  
        setContentView(webview); 
	}
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		// TODO Auto-generated method stub
		if((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()){
			webview.goBack(); //goBack()��ʾ����WebView����һҳ��  
            return true;  
		}
		return false;
	}
	
	

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
}
