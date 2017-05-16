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
		//设置WebView属性，能够执行Javascript脚本  
		webview.getSettings().setJavaScriptEnabled(true);  
        //加载需要显示的网页  
//		webview.loadUrl("file:///android_asset/src/app/login/login-home.html");
//		webview.loadUrl("http://192.168.1.132:8081/ykyl-ui-yu/src/app/login/login-home.html#/user");
//		webview.loadUrl("http://192.168.1.132:8081/src/app/login/login-home.html#/user");
//		webview.loadUrl("http://www.baidu.com");
		
//		webview.loadUrl("file:///android_asset/src/app/login/NewFile.html");
		//使用webstorm
//		webview.loadUrl("http://192.168.1.132:8081/ykyl-ui-yu/src/app/login/login-home.html#/user");
		//使用http-server
		webview.loadUrl("http://192.168.1.132:8080/src/app/login/login-home.html#/user");
		
		webview.setWebViewClient(new WebViewClient(){ 
		      public boolean shouldOverrideUrlLoading(WebView view, String url) {
		                 view.loadUrl(url);//点击超链接的时候重新在原来进程上加载URL
		                 return true;
		     }
		});   
		
		//设置Web视图  
        setContentView(webview); 
	}
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		// TODO Auto-generated method stub
		if((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()){
			webview.goBack(); //goBack()表示返回WebView的上一页面  
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
